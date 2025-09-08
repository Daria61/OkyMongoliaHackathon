import { all, put, select, takeLatest } from 'redux-saga/effects'
import { RehydrateAction, REHYDRATE } from 'redux-persist'
import { ExtractActionFromActionType } from '../types'
import { httpClient } from '../../services/HttpClient'
import * as selectors from '../selectors'
import * as actions from '../actions'
import { Locale, content as staleContent } from '../../resources/translations'
import _ from 'lodash'
import {
  fromAvatarMessages,
  fromDidYouKnows,
  fromEncyclopedia,
  fromHelpCenters,
  fromQuizzes,
} from '../../mappers'

function* onRehydrate(action: RehydrateAction) {
  // @ts-expect-error TODO:
  const locale = yield select(selectors.currentLocaleSelector)

  const hasPreviousContentFromStorage =
    // @ts-expect-error TODO:
    action.payload && action.payload.content

  if (!hasPreviousContentFromStorage) {
    // @ts-expect-error TODO:
    yield put(actions.initStaleContent(staleContent[locale]))
  }

  const now = new Date().getTime()
  // TODO: what time interval should we use?
  const fetchInterval = 0 // 1000 * 60 * 60 * 24 // 24 hours
  // @ts-expect-error TODO:
  const timeFetched = action.payload && action.payload.content?.timeFetched
  const shouldFetch = !timeFetched || timeFetched + fetchInterval < now

  if (shouldFetch) {
    yield put(actions.fetchContentRequest(locale))
  }
}

function* onFetchSurveyContent() {
  // @ts-expect-error TODO:
  const locale = yield select(selectors.currentLocaleSelector)
  // @ts-expect-error TODO:
  const userID = yield select(selectors.currentUserSelector)
  try {
    // @ts-expect-error TODO:
    const surveys = yield httpClient.fetchSurveys({
      locale,
      userID,
    })
    // @ts-expect-error TODO:
    const previousSurveys = yield select(selectors.allSurveysSelector)
    // @ts-expect-error TODO:
    const completedSurveys = yield select(selectors.completedSurveysSelector)
    const newSurveyArr = previousSurveys?.length ? previousSurveys : []
    // @ts-expect-error TODO:
    surveys.forEach((item) => {
      const itemExits = _.find(previousSurveys, { id: item.id })
      if (!itemExits) {
        newSurveyArr.push(item)
      }
    })
    // @ts-expect-error TODO:
    const finalArr = []
    // @ts-expect-error TODO:
    newSurveyArr.forEach((item) => {
      const itemExits = _.find(completedSurveys, { id: item.id })
      if (!itemExits) {
        finalArr.push(item)
      }
    })

    // @ts-expect-error TODO:
    yield put(actions.updateAllSurveyContent(finalArr))
  } catch (error) {
    // console.log("*** error", JSON.stringify(error));
  }
}

function* onFetchContentRequest(action: ExtractActionFromActionType<'FETCH_CONTENT_REQUEST'>) {
  const { locale } = action.payload as { locale: Locale } // TODO:

  function* fetchEncyclopedia() {
    try {
      // @ts-expect-error TODO:
      const encyclopediaResponse = yield httpClient.fetchEncyclopedia({ locale })

      // Commented out video fetching
      // const videosResponse = yield httpClient.fetchVideos({ locale })

      return fromEncyclopedia({ encyclopediaResponse, videosResponse: [] })
    } catch (error) {
      console.error('❌ Encyclopedia fetch error:', error)
      throw error
    }
  }

  function* fetchPrivacyPolicy() {
    try {
      // @ts-expect-error TODO:
      const privacyPolicy = yield httpClient.fetchPrivacyPolicy({
        locale,
      })
      return privacyPolicy
    } catch (error) {
      return []
    }
  }

  function* fetchTermsAndConditions() {
    try {
      // @ts-expect-error TODO:
      const termsAndConditions = yield httpClient.fetchTermsAndConditions({
        locale,
      })
      return termsAndConditions
    } catch (error) {
      console.error('❌ TermsAndConditions fetch error:', error)
      return []
    }
  }

  function* fetchAbout() {
    try {
      // @ts-expect-error TODO:
      const about = yield httpClient.fetchAbout({
        locale,
      })
      return about
    } catch (error) {
      console.log('⚠️ Returning empty about due to error')
      return []
    }
  }

  function* fetchAboutBannerConditional() {
    try {
      // @ts-expect-error TODO:
      const timestamp = yield select((s) => s.content.aboutBannerTimestamp)
      // @ts-expect-error TODO:
      const aboutBanner = yield httpClient.fetchAboutBannerConditional({
        locale,
        timestamp,
      })
      return aboutBanner
    } catch (error) {
      console.log('⚠️ Returning empty aboutBanner due to error')
      return null
    }
  }

  function* fetchHelpCenters() {
    try {
      // @ts-expect-error TODO:
      const helpCenterResponse = yield httpClient.fetchHelpCenters({
        locale,
      })
      return fromHelpCenters(helpCenterResponse)
    } catch (error) {
      console.error('❌ HelpCenters fetch error:', error)
      return { helpCenters: [] }
    }
  }

  function* fetchHelpCentersAttributes() {
    try {
      const helpCenterAttributesResponse =
        // @ts-expect-error TODO:
        yield httpClient.fetchHelpCenterAttributes({
          locale,
        })
      return helpCenterAttributesResponse
    } catch (error) {
      console.log('⚠️ Returning empty array for helpCenterAttributes due to 404')
      return [] // Return empty array instead of throwing
    }
  }

  function* fetchQuizzes() {
    try {
      // @ts-expect-error TODO:
      const quizzesResponse = yield httpClient.fetchQuizzes({
        locale,
      })
      return fromQuizzes(quizzesResponse)
    } catch (error) {
      console.error('❌ Quizzes fetch error:', error)
      return { quizzes: { allIds: [], byId: {} } }
    }
  }

  function* fetchDidYouKnows() {
    try {
      // @ts-expect-error TODO:
      const didYouKnows = yield httpClient.fetchDidYouKnows({
        locale,
      })
      return fromDidYouKnows(didYouKnows)
    } catch (error) {
      console.error('❌ DidYouKnows fetch error:', error)
      return { didYouKnows: { allIds: [], byId: {} } }
    }
  }

  function* fetchAvatarMessages() {
    try {
      // @ts-expect-error TODO:
      const avatarMessages = yield httpClient.fetchAvatarMessages({
        locale,
      })
      return fromAvatarMessages(avatarMessages)
    } catch (error) {
      console.error('❌ AvatarMessages fetch error:', error)
      return { avatarMessages: [] }
    }
  }

  try {
    const { articles, categories, subCategories, videos } = yield fetchEncyclopedia()
    const { quizzes } = yield fetchQuizzes()
    const { didYouKnows } = yield fetchDidYouKnows()
    const { helpCenters } = yield fetchHelpCenters()
    // @ts-expect-error TODO:
    const helpCenterAttributes = yield fetchHelpCentersAttributes()
    const { avatarMessages } = yield fetchAvatarMessages()
    // @ts-expect-error TODO:
    const privacyPolicy = yield fetchPrivacyPolicy()
    // @ts-expect-error TODO:
    const termsAndConditions = yield fetchTermsAndConditions()
    // @ts-expect-error TODO:
    const about = yield fetchAbout()
    // @ts-expect-error TODO:
    const aboutBannerData = yield fetchAboutBannerConditional()

    const fallback = staleContent[locale as keyof typeof staleContent] || {}
    yield put(
      actions.fetchContentSuccess({
        timeFetched: new Date().getTime(),
        articles: _.isEmpty(articles.allIds)
          ? fallback.articles || { allIds: [], byId: {} }
          : articles,
        videos: _.isEmpty(videos.allIds) ? fallback.videos || { allIds: [], byId: {} } : videos,
        categories: _.isEmpty(categories.allIds)
          ? fallback.categories || { allIds: [], byId: {} }
          : categories,
        subCategories: _.isEmpty(subCategories.allIds)
          ? fallback.subCategories || { allIds: [], byId: {} }
          : subCategories,
        quizzes: _.isEmpty(quizzes.allIds) ? fallback.quizzes || { allIds: [], byId: {} } : quizzes,
        didYouKnows: _.isEmpty(didYouKnows.allIds)
          ? fallback.didYouKnows || { allIds: [], byId: {} }
          : didYouKnows,
        helpCenters: _.isEmpty(helpCenters) ? fallback.helpCenters || [] : helpCenters,
        helpCenterAttributes: _.isEmpty(helpCenterAttributes)
          ? fallback.helpCenterAttributes || []
          : helpCenterAttributes,
        avatarMessages: _.isEmpty(avatarMessages) ? fallback.avatarMessages || [] : avatarMessages,
        privacyPolicy: _.isEmpty(privacyPolicy) ? fallback.privacyPolicy || [] : privacyPolicy,
        termsAndConditions: _.isEmpty(termsAndConditions)
          ? fallback.termsAndConditions || []
          : termsAndConditions,
        about: _.isEmpty(about) ? fallback.about || [] : about,
        aboutBanner: aboutBannerData?.aboutBanner,
        aboutBannerTimestamp: aboutBannerData?.aboutBannerTimestamp,
      }),
    )
  } catch (error) {
    console.error('❌ Content fetch failed:', error)
    yield put(actions.fetchContentFailure())
    // @ts-expect-error TODO:
    const aboutContent = yield select(selectors.aboutContent)
    if (!aboutContent) {
      const localeInit = (yield select(selectors.currentLocaleSelector)) as Locale
      yield put(actions.initStaleContent(staleContent[localeInit]))
    }
  }
}

function* onSetLocale(action: ExtractActionFromActionType<'SET_LOCALE'>) {
  const { locale } = action.payload

  // Only initialize stale content if it exists for this locale
  if (staleContent[locale as keyof typeof staleContent]) {
    yield put(actions.initStaleContent(staleContent[locale as keyof typeof staleContent]))
  }

  yield put(actions.fetchContentRequest(locale))
}

export function* contentSaga() {
  yield all([
    takeLatest(REHYDRATE, onRehydrate),
    takeLatest('SET_LOCALE', onSetLocale),
    takeLatest('FETCH_CONTENT_REQUEST', onFetchContentRequest),
    takeLatest('FETCH_SURVEY_CONTENT_REQUEST', onFetchSurveyContent),
  ])
}
