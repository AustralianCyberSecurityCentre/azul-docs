import MDXComponents from '@theme-original/MDXComponents';
import Quiz from '../components/Quiz';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Expose the custom Quiz component everywhere by default
  Quiz,
};
