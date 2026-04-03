import { test, expect } from '@playwright/test';

test('should return a valid list of posts', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);

  const firstPost = body[0];

  expect(typeof firstPost.id).toBe('number');
  expect(typeof firstPost.title).toBe('string');
  expect(firstPost.title.length).toBeGreaterThan(0);
  expect(typeof firstPost.body).toBe('string');
  expect(firstPost.body.length).toBeGreaterThan(0);
});