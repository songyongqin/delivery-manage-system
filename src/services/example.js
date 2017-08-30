import request from '../utils/request';

export function query(payload) {
  console.info(payload);
  const options={
    method:"GET"
  }

  return request('/api/user/login',options);
}
