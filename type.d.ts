interface FeaturedImage {
    data: {
      attributes: {
        url: string;
      };
    };
  }
  
  interface Attributes {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: FeaturedImage;
  }
  
  interface Data {
    attributes: Attributes;
  }
  
  interface Posts {
    data: Data[];
  }
  
  interface GraphQLResponse {
    data: {
      posts: Posts;
    };
  }
  
  declare module '*.graphql' {
    import { DocumentNode } from 'graphql';
    const value: DocumentNode;
    export = value;
  }
  