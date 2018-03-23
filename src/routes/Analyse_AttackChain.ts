import * as React from 'react'
import dynamic from 'dva/dynamic'
import WithRouteInit from 'domainComponents/WithRouteInit'

export default (app: any, url: string): React.Component => {

  return dynamic({
    app,
    models: () => [
      System.import(/* webpackChunkName: "AnalyseAttackChainModel" */'modules/Analyse_AttackChain/model'),
    ],
    component: () => System.import(/* webpackChunkName: "AnalyseAttackChainPage" */'modules/Analyse_AttackChain')
      .then(page => WithRouteInit(url)(page)),
  })

}