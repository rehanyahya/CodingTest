export interface PostsResponse {
  data: Posts[];
  pagination: Pagination;
}

export interface Posts {
  id: string;
  url: string;
  title: string;
  images: Images;
}

export interface Images {
  original: Original;
}

export interface Original {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
  frames: string;
  hash: string;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}
