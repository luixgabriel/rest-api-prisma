export interface HttpResponse<G> {
  statusCode: number
  body: G | string
}
