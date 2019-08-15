import { AsTitlePipe } from './as-title.pipe';

describe('AsTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new AsTitlePipe();
    expect(pipe).toBeTruthy();
  });
  it('Should titlize a normal word', () => {
    const pipe = new AsTitlePipe();
    expect(pipe.transform('title')).toEqual('Title');
  });
  it('Should titlize a word containing "-"', () => {
    const pipe = new AsTitlePipe();
    expect(pipe.transform('title-chunk')).toEqual('Title Chunk');
  });
  it('Should titlize a word containing "_"', () => {
    const pipe = new AsTitlePipe();
    expect(pipe.transform('title_chunk')).toEqual('Title Chunk');
  });
  it('Should titlize a word containing both "_" and "-"', () => {
    const pipe = new AsTitlePipe();
    expect(pipe.transform('title_chunk-chunk')).toEqual('Title Chunk Chunk');
  });
});
