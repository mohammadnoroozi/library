interface ApiMessageModel {
  isOk: boolean,
  message: string | React.ReactNode,
  statusCode: number,
  errors: string[]
}
export default ApiMessageModel;
