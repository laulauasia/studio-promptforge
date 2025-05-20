import type { PromptTemplate } from '@/types';
import { MessageSquare, Edit3, Mail, FileText, Search, Briefcase, BookOpen } from 'lucide-react';

export const promptTemplates: PromptTemplate[] = [
  {
    id: 'tweet-general',
    name: 'Engaging Social Media Post',
    description: 'Craft a concise and engaging post for social media (e.g., Twitter, LinkedIn).',
    category: 'General', // Changed from Social Media to General for filter buttons
    template: 'Compose a social media post about [topic], focusing on its [key_benefit]. Ensure it is engaging and includes the hashtag #[main_hashtag]. Optional extra hashtags: [optional_hashtags]. Call to action: [cta]. Tone: [tone].',
    placeholders: [
      { name: 'topic', label: 'Topic/Product', defaultValue: 'our new AI tool', isRequired: true },
      { name: 'key_benefit', label: 'Key Benefit', defaultValue: 'boosts productivity by 30%', isRequired: true },
      { name: 'main_hashtag', label: 'Main Hashtag', defaultValue: 'AI', isRequired: true },
      { name: 'optional_hashtags', label: 'Optional Hashtags (comma-separated)', defaultValue: 'Innovation, Tech' },
      { name: 'cta', label: 'Call to Action (optional)', defaultValue: 'Learn more on our site!' },
      { name: 'tone', label: 'Tone (e.g. witty, professional)', defaultValue: 'witty' },
    ],
    icon: MessageSquare,
  },
  {
    id: 'blog-intro-writing',
    name: 'Blog Post Introduction',
    description: 'Generate a captivating introduction for a blog post.',
    category: 'Writing',
    template: 'Write an engaging introduction for a blog post titled "[blog_title]". The main theme is [main_theme] and the target audience is [target_audience]. Hook the reader by mentioning [hook_point].',
    placeholders: [
      { name: 'blog_title', label: 'Blog Title', defaultValue: 'The Future of AI in Content Creation', isRequired: true },
      { name: 'main_theme', label: 'Main Theme', defaultValue: 'how AI is revolutionizing writing', isTextArea: true, isRequired: true },
      { name: 'target_audience', label: 'Target Audience', defaultValue: 'content creators and marketers', isRequired: true },
      { name: 'hook_point', label: 'Hook Point', defaultValue: 'a surprising statistic about AI adoption', isRequired: true },
    ],
    icon: Edit3,
  },
  {
    id: 'email-subject-writing',
    name: 'Email Subject Line Ideas',
    description: 'Create compelling email subject lines.',
    category: 'Writing',
    template: 'Generate 5 catchy email subject lines for an email about [product_service] targeting [audience_segment]. The key message is [key_message]. Desired tone: [tone].',
    placeholders: [
      { name: 'product_service', label: 'Product/Service', defaultValue: 'our new analytics platform', isRequired: true },
      { name: 'audience_segment', label: 'Audience Segment', defaultValue: 'small business owners', isRequired: true },
      { name: 'key_message', label: 'Key Message', defaultValue: 'save time and increase profits', isRequired: true },
      { name: 'tone', label: 'Desired Tone (e.g., urgent, friendly)', defaultValue: 'friendly and intriguing', isRequired: true },
    ],
    icon: Mail,
  },
  {
    id: 'product-description-business',
    name: 'Persuasive Product Description',
    description: 'Write a persuasive product description for marketing.',
    category: 'Business', // Changed from Marketing to Business
    template: 'Craft a compelling product description for [product_name]. It is a [product_category] that helps [target_customer] to [solve_problem] by offering [unique_features]. Highlight these benefits: [benefit1], [benefit2], [benefit3]. The tone should be [tone]. Max length: [max_length] words.',
    placeholders: [
      { name: 'product_name', label: 'Product Name', defaultValue: 'SynthWave Pro', isRequired: true },
      { name: 'product_category', label: 'Product Category', defaultValue: 'music production software', isRequired: true },
      { name: 'target_customer', label: 'Target Customer', defaultValue: 'electronic music producers', isRequired: true },
      { name: 'solve_problem', label: 'Solve Problem/Achieve Goal', defaultValue: 'create unique soundscapes effortlessly', isRequired: true },
      { name: 'unique_features', label: 'Unique Features (comma-separated)', defaultValue: 'AI-powered synth engine, intuitive UI, vast preset library', isTextArea: true, isRequired: true },
      { name: 'benefit1', label: 'Benefit 1', defaultValue: 'Unleash creativity', isRequired: true },
      { name: 'benefit2', label: 'Benefit 2', defaultValue: 'Speed up workflow', isRequired: true },
      { name: 'benefit3', label: 'Benefit 3', defaultValue: 'Achieve professional sound', isRequired: true },
      { name: 'tone', label: 'Tone (e.g. professional, playful)', defaultValue: 'innovative and inspiring', isRequired: true },
      { name: 'max_length', label: 'Max Length (words)', defaultValue: '150', isRequired: true },
    ],
    icon: Briefcase, // Changed from FileText to Briefcase for Business
  },
  {
    id: 'seo-keywords-general',
    name: 'SEO Keyword Ideas',
    description: 'Generate SEO keyword ideas for a topic.',
    category: 'General', // Changed from SEO to General
    template: 'Provide a list of 10-15 long-tail and short-tail SEO keywords related to the main topic "[main_topic]". Consider keywords for [audience_type] who are looking for [user_intent]. Include some question-based keywords.',
    placeholders: [
      { name: 'main_topic', label: 'Main Topic', defaultValue: 'sustainable gardening', isRequired: true },
      { name: 'audience_type', label: 'Audience Type (e.g. beginners, experts)', defaultValue: 'urban gardening beginners', isRequired: true },
      { name: 'user_intent', label: 'User Intent (e.g. to learn, to buy)', defaultValue: 'to learn basic techniques', isRequired: true },
    ],
    icon: Search,
  },
  {
    id: 'summary-writing',
    name: 'Text Summarizer',
    description: 'Summarize a long piece of text concisely.',
    category: 'Writing',
    template: 'Summarize the following text in approximately [summary_length] words, capturing the main points: [text_to_summarize]',
    placeholders: [
      { name: 'text_to_summarize', label: 'Text to Summarize', defaultValue: 'Paste your long text here...', isTextArea: true, maxLength: 5000, isRequired: true },
      { name: 'summary_length', label: 'Desired Summary Length (words)', defaultValue: '100', isRequired: true },
    ],
    icon: BookOpen,
  },
  {
    id: 'business-plan-business',
    name: 'Business Idea Outline',
    description: 'Generate a basic outline for a new business idea.',
    category: 'Business',
    template: 'Create a basic business outline for an idea about [business_concept]. Key aspects to cover: Problem, Solution, Target Market, Unique Selling Proposition (USP), and Revenue Streams. Keep it concise.',
    placeholders: [
      { name: 'business_concept', label: 'Business Concept/Idea', defaultValue: 'an eco-friendly subscription box', isTextArea: true, isRequired: true },
    ],
    icon: Briefcase,
  },
];
