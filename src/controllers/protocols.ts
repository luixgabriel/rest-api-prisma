export interface HttpResponse<G> {
  statusCode: number
  body: G | string
}
export interface HttpRequest<B> {
  params?: any
  headers?: any
  body?: B
}
