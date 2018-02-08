import 'isomorphic-fetch';

export const mockResponse = (status: number, statusText: string): Response =>
  new Response(null, {status, statusText});


