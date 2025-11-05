#!/bin/bash

# iOS Crash Fix Verification Script
# This script verifies all fixes are in place before App Store submission

echo "🔍 iOS Crash Fix Verification"
echo "=============================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Check 1: GoogleService-Info.plist exists
echo "📝 Check 1: Firebase Configuration"
if [ -f "ios/OkyMongolia/GoogleService-Info.plist" ]; then
    echo -e "${GREEN}✅ GoogleService-Info.plist found${NC}"
else
    echo -e "${RED}❌ GoogleService-Info.plist NOT FOUND${NC}"
    echo "   Location: ios/OkyMongolia/GoogleService-Info.plist"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 2: ErrorBoundary component exists
echo "📝 Check 2: Error Boundary Component"
if [ -f "src/components/ErrorBoundary.tsx" ]; then
    echo -e "${GREEN}✅ ErrorBoundary.tsx found${NC}"
else
    echo -e "${RED}❌ ErrorBoundary.tsx NOT FOUND${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 3: AppDelegate has error handling
echo "📝 Check 3: Native Error Handling"
if grep -q "@try" "ios/OkyMongolia/AppDelegate.mm"; then
    echo -e "${GREEN}✅ AppDelegate.mm has @try/@catch block${NC}"
else
    echo -e "${RED}❌ AppDelegate.mm missing error handling${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 4: App.tsx has ErrorBoundary
echo "📝 Check 4: React Error Boundary"
if grep -q "ErrorBoundary" "App.tsx"; then
    echo -e "${GREEN}✅ App.tsx uses ErrorBoundary${NC}"
else
    echo -e "${RED}❌ App.tsx missing ErrorBoundary${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 5: App.tsx has error handlers
echo "📝 Check 5: Global Error Handlers"
if grep -q "ErrorUtils" "App.tsx"; then
    echo -e "${GREEN}✅ App.tsx has ErrorUtils handler${NC}"
else
    echo -e "${YELLOW}⚠️  App.tsx missing ErrorUtils handler${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check 6: Firebase service has defensive code
echo "📝 Check 6: Firebase Error Handling"
if grep -q "firebaseApp" "src/services/firebase.ts"; then
    echo -e "${GREEN}✅ firebase.ts has defensive checks${NC}"
else
    echo -e "${YELLOW}⚠️  firebase.ts might be missing checks${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check 7: Build number
echo "📝 Check 7: Build Number"
BUILD_NUMBER=$(grep -A 2 '"buildNumber"' "src/resources/app.json" | grep -o '[0-9]*' | head -1)
if [ "$BUILD_NUMBER" -gt 80 ]; then
    echo -e "${GREEN}✅ Build number is ${BUILD_NUMBER} (incremented)${NC}"
else
    echo -e "${YELLOW}⚠️  Build number is ${BUILD_NUMBER} - consider incrementing${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check 8: Version
echo "📝 Check 8: App Version"
VERSION=$(grep '"version"' "src/resources/app.json" | grep -o '[0-9]\.[0-9]\.[0-9]' | head -1)
if [ ! -z "$VERSION" ]; then
    echo -e "${GREEN}✅ Version is ${VERSION}${NC}"
else
    echo -e "${YELLOW}⚠️  Version not found or incorrect format${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check 9: Firebase package versions
echo "📝 Check 9: Firebase Package Versions"
if grep -q '"@react-native-firebase/app": "20.4.0"' "package.json"; then
    echo -e "${GREEN}✅ Firebase packages are at 20.4.0${NC}"
else
    echo -e "${YELLOW}⚠️  Firebase packages might have version mismatch${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check 10: node_modules exists
echo "📝 Check 10: Dependencies"
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules exists${NC}"
else
    echo -e "${RED}❌ node_modules NOT FOUND - run 'yarn install'${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 11: Pods installed
echo "📝 Check 11: iOS Pods"
if [ -d "ios/Pods" ]; then
    echo -e "${GREEN}✅ Pods installed${NC}"
else
    echo -e "${RED}❌ Pods NOT INSTALLED - run 'cd ios && pod install'${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Summary
echo "=============================="
echo "📊 Verification Summary"
echo "=============================="
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed!${NC}"
    echo ""
    echo "✅ Ready for App Store submission"
    echo ""
    echo "Next steps:"
    echo "1. Test on physical device: npx expo run:ios --device"
    echo "2. Create archive in Xcode"
    echo "3. Submit to App Store"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  ${WARNINGS} warning(s) found${NC}"
    echo ""
    echo "Warnings are non-critical but should be reviewed."
    echo "The app should still work correctly."
    exit 0
else
    echo -e "${RED}❌ ${ERRORS} critical error(s) found${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  ${WARNINGS} warning(s) found${NC}"
    fi
    echo ""
    echo "Please fix the errors above before submitting."
    echo "See IOS_CRASH_FIX.md for detailed instructions."
    exit 1
fi
