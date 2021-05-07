export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    authors: Array<string>;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    },
    previewLink: string;
  };
}

export interface ICart {
  Items: Array<IItem>;
}

export interface IItem {
  Item: IBook,
  Amount: number
}