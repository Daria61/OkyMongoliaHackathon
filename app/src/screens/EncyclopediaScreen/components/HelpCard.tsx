import React from 'react'
import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Text } from '../../../components/Text'
import { getAsset } from '../../../services/asset'
import { useSelector } from 'react-redux'
import { currentAvatarSelector } from '../../../redux/selectors'
import { useColor } from '../../../hooks/useColor'

export const HelpCard = ({ ...props }: TouchableOpacityProps) => {
  const selectedAvatar = useSelector(currentAvatarSelector)
  const { palette } = useColor()

  // Fallback to 'panda' if the selected avatar doesn't exist
  const validAvatar =
    selectedAvatar === 'panda' || selectedAvatar === 'unicorn' ? selectedAvatar : 'panda'
  const imageSource = getAsset(`avatars.${validAvatar}.stationary_colour`)

  return (
    <TouchableOpacity style={styles.helpCard} {...props}>
      <Image resizeMode="contain" source={imageSource} style={styles.image} />
      <Text style={[styles.text, { color: palette.secondary.text }]}>find help</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  helpCard: {
    zIndex: 9999,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
  },
  image: {
    height: 80,
    width: 80,
  },
})
