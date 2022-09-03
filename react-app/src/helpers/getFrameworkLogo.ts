export const getFrameworkLogo = (framework: 'vue' | 'react' | 'angular') => {
  if (framework === 'react') {
    return 'https://assets.vercel.com/zeit-inc/image/fetch/https://raw.githubusercontent.com/vercel/vercel/main/packages/frameworks/logos/react.svg';
  } else if (framework === 'vue') {
    return 'https://assets.vercel.com/zeit-inc/image/fetch/https://raw.githubusercontent.com/vercel/vercel/main/packages/frameworks/logos/vue.svg';
  } else if (framework === 'angular') {
    return 'https://assets.vercel.com/zeit-inc/image/fetch/https://raw.githubusercontent.com/vercel/vercel/main/packages/frameworks/logos/angular.svg';
  }
};
