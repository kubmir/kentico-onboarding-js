import 'isomorphic-fetch';

export const mockResponse = (status: number, statusText: string, body?: string): Response =>
  new Response(body, {status, statusText});

export const mockServerNote = (text: string, id: Guid) => ({
  text,
  id,
  lastModificationDate: new Date(2017, 12, 5),
  creationDate: new Date(2017, 12, 4),
});
