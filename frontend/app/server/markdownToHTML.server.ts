import { marked } from 'marked';

const markdownToHTML = (markdown: any) => {
  return marked(markdown, { breaks: true });
};

export { markdownToHTML };