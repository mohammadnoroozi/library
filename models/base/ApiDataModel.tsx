import ApiMessageModel from "./ApiMessageModel";

interface ApiDataModel<T> extends ApiMessageModel {
  totalCount: number,
  pageSize: number,
  pageCount: number,
  data: T,
  hasMore: boolean
}
export default ApiDataModel;
