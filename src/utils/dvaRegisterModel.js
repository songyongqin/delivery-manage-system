/**
 * Created by jojo on 2017/8/21.
 */
const cached = {};
export default (app)=>{
  return (model)=>{
    if (!cached[model.namespace]) {
      app.model(model);
      cached[model.namespace] = 1;
    }
  }
}
