#!/bin/bash

source ./bin/modules/urls.sh
source ./bin/modules/paths.sh

# Create the .gitmodules file if it doesn't exist
if [ ! -f .gitmodules ]; then
    touch .gitmodules
fi

# Add the submodules (only if URLs are defined)
[ -n "$k8s_url" ] && git submodule add $k8s_url $k8s_path 2>/dev/null || echo "k8s submodule already exists or skipped"
[ -n "$resources_url" ] && git submodule add $resources_url $resources_path 2>/dev/null || echo "resources submodule skipped (using main repo resources)"
[ -n "$common_url" ] && git submodule add $common_url $common_path 2>/dev/null || echo "common submodule already exists or skipped"
[ -n "$delete_account_url" ] && git submodule add $delete_account_url $delete_account_path 2>/dev/null || echo "delete-account submodule already exists or skipped"

# Optional modules
[ -n "$flower_url" ] && git submodule add $flower_url $flower_path 2>/dev/null || true

# Since resources submodule is disabled, create symlink from app/src/resources to root resources/
if [ ! -e "app/src/resources" ]; then
    echo "Creating symlink: app/src/resources -> ../../resources"
    cd app/src && ln -s ../../resources resources && cd ../..
    echo "Symlink created successfully"
else
    echo "app/src/resources already exists"
fi

# Create common directory if it doesn't exist (placeholder for submodule)
if [ ! -d "packages/core/src/common" ]; then
    echo "Creating placeholder common directory"
    mkdir -p packages/core/src/common
    cat > packages/core/src/common/index.ts << 'EOF'
// Placeholder for common module
// This directory should be populated by git submodule
// For now, exports are handled here

export type Locale = 'en' | 'mn' | 'id'
export const defaultLocale: Locale = 'en'

// Placeholder exports - these should come from submodule
export const countries = {}
export const provinces = []
export const cmsLanguages = {
  en: {
    en: 'English (global)',
    mn: 'Монгол',
  },
  mn: {
    en: 'English (global)',
    mn: 'Монгол',
  },
}
export const cmsLocales = cmsLanguages
EOF
    echo "Placeholder common/index.ts created"
fi

# Use the latest commits for existing submodules
git submodule update --init --recursive 2>/dev/null || echo "No submodules to update"

# Git adds .diff files to the core repo, this removes them so we dont have to commit these files
# Adding *.diff to gitignore didn't work
git restore --staged . 2>/dev/null || true
