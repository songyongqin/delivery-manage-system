

import React from 'react';
const search = require('./search.png');
const question = require('./question.png');
const excalmatory = require('./excalmatory.png')
const fallAssetPng = require('./weixian.png')
const SvgComponents = ( { width, height, children } ) => {
  return (
    <svg  viewBox="0 0 1024 1024" version="1.1"   width={ width } height={ height }  >
        <defs><style type="text/css"></style></defs>
        { children }
      </svg>
  )
}


export const Situation =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" } } >
      <SvgComponents width={ style.width } height={ style.height }>
        <path d="M886.784 207.36l-1.024-24.576-22.016-10.24c-7.68-3.584-192-86.528-366.592-86.528C322.56 86.016 138.24 168.96 130.048 172.544l-22.016 10.24-1.024 24.576c0 7.168-6.144 176.64 26.112 332.8l68.608-66.048c-15.872-114.688-16.384-187.904-15.872-239.104 52.736-20.992 187.392-70.144 311.296-70.144 123.904 0 258.56 49.152 311.296 70.144 0.512 58.88-2.56 211.456-35.328 333.312-45.568 161.792-224.768 251.392-275.968 274.432-43.008-18.944-174.08-83.968-243.2-198.656L366.08 522.24l110.592 92.16L655.36 418.816l3.072 66.56 71.68-3.584-9.728-197.12-189.952 9.216 3.584 71.68 65.536-3.072-130.048 142.848-110.08-92.16L158.72 630.784l12.288 24.576c90.112 181.76 303.616 263.168 312.832 266.752l13.824 5.12 13.824-5.12c11.264-4.096 273.92-104.96 337.92-332.8 44.032-165.376 37.888-373.248 37.376-381.952z" fill="currentColor" p-id="23589"></path>
      </SvgComponents>
    </div>
  )
}

export const ThreatReport = ({ style={ width:"20", height:'20' } }) => {
  return(
    <div style={ { ...style, display:"inline-block" } } >
      <SvgComponents width={ style.width } height={ style.height }>
        <path d="M916.659785 888.698454 104.554776 888.698454c-23.223934 0-42.006719-18.806321-42.006719-42.007743L62.548056 174.630273c0-23.199375 18.782785-41.99444 42.006719-41.99444 23.176862 0 42.006719 18.794042 42.006719 41.99444l0 532.050662 0 98.005105 770.099313 0c23.176862 0 42.007743 18.804275 42.007743 42.004673C958.666504 869.892133 939.836647 888.698454 916.659785 888.698454M818.626028 762.682389l-84.013439 0c-23.176862 0-42.007743-18.795065-42.007743-41.993416l0-294.02657c0-23.212678 18.829857-42.004673 42.007743-42.004673l84.013439 0c23.224957 0 42.008766 18.795065 42.008766 42.004673l0 294.02657C860.63377 743.887324 841.852008 762.682389 818.626028 762.682389M580.602959 762.682389l-84.013439 0c-23.200398 0-42.007743-18.795065-42.007743-41.993416L454.581778 258.641665c0-23.200398 18.807345-42.005696 42.007743-42.005696l84.013439 0c23.199375 0 42.006719 18.805298 42.006719 42.005696l0 462.046285C622.609679 743.887324 603.803357 762.682389 580.602959 762.682389M342.578868 762.682389l-84.013439 0c-23.223934 0-42.006719-18.795065-42.006719-41.993416l0-84.012416c0-23.198352 18.782785-42.004673 42.006719-42.004673l84.013439 0c23.200398 0 42.007743 18.806321 42.007743 42.004673l0 84.012416C384.585587 743.887324 365.779266 762.682389 342.578868 762.682389" p-id="8524" fill="currentColor"></path>
      </SvgComponents>
    </div>
  )
}

export const AttackAsset =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" } } >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M466.752 164.16a32.128 32.128 0 0 1 27.648-15.808l39.808 0.128a32 32 0 0 1 27.712 16.128l76.032 133.12L711.04 256 610.752 80.448a32 32 0 0 0-27.648-16.128L445.44 64a32.128 32.128 0 0 0-27.712 15.808L310.72 262.336 384 305.152l82.752-140.992zM958.464 381.248l-89.344-56.64-4.736-105.984-211.456 230.144zM158.208 217.216l-4.672 106.752-89.984 56.96 307.584 68.544zM427.008 960l83.904-43.776L595.264 960l-84.352-267.52zM843.904 491.776l-73.536 42.432 81.344 141.76a32 32 0 0 1 0 31.872l-19.84 34.496a32.064 32.064 0 0 1-27.776 16.064h-153.344v84.16h202.112a32 32 0 0 0 27.712-16.064l68.608-119.36a31.872 31.872 0 0 0 0-31.872l-105.28-183.488zM189.056 742.912l-28.992-51.008 90.496-156.288-73.536-42.432-105.344 182.784a32 32 0 0 0 0 31.936l68.544 119.296a32.064 32.064 0 0 0 27.776 16.064h204.928v-84.16H216.832a31.872 31.872 0 0 1-27.776-16.192z" fill="currentColor" p-id="1403"></path>
      <path d="M510.08 430.144m-81.472 0a81.472 81.472 0 1 0 162.944 0 81.472 81.472 0 1 0-162.944 0Z" fill="currentColor" p-id="1404"></path>
      <path d="M348.608 670.848h326.592c-2.624-88.128-74.496-158.912-163.264-158.912s-160.64 70.784-163.328 158.912z" fill="currentColor" p-id="1405"></path>
      </SvgComponents>
    </div>
  )
}

export const Attacker =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" } } >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M260.9 495.2c28.8 33 69.4 57.1 121.8 72.3v11.8c0 14.7 5 27 14.9 36.9 10 10 22.3 15.5 36.9 16.5 15.2 1.1 26.4-1.6 33.8-7.9 11.5 8.4 24.4 12.6 38.5 12.6 13.1 0 25.2-3.9 36.1-11.8 7.3 5.7 18.1 8.1 32.2 7.1 14.7-1.6 27-7.2 36.9-16.9 10-9.7 14.9-21.9 14.9-36.5v-8.6c56.6-14.7 100.3-39.3 131.3-73.9 29.9-33 44.8-72 44.8-117.1 0-10-1-20.4-3.2-31.5-10.5-67-41.4-122.3-92.7-165.8-54-46.6-119.7-69.9-197.3-69.9-77.6 0-143.3 23.1-197.3 69.1-51.4 44.1-82 99.6-91.9 166.6-2.1 11-3.2 21.5-3.2 31.5 0.3 44 14.7 82.5 43.5 115.5zM571 308.5c15.5-16.3 34.2-24.4 56.2-24.4 22.5 0 41.5 8.1 57 24.4 15.4 16.3 23.2 36 23.2 59.1s-7.7 42.9-23.2 59.2c-15.5 16.3-34.5 24.4-57 24.4-22 0-40.7-8.1-56.2-24.4-15.5-16.3-23.2-36-23.2-59.2 0-23.1 7.7-42.8 23.2-59.1zM487.7 473c7.6-9.8 15-14.7 22.4-14.7 7.3 0 14.3 5.4 20.8 16.4 6.5 10.9 9.9 21.2 9.9 31.1 0 15-10 22.5-29.9 22.5-13.1 0-22.8-3.4-29.1-10.1-3.7-4.2-5.5-9.3-5.5-15.6 0-9.9 3.8-19.7 11.4-29.6zM329.3 308.5c15.7-16.3 34.6-24.4 56.6-24.4s40.9 8.1 56.6 24.4c15.7 16.3 23.6 36 23.6 59.1s-7.9 42.9-23.6 59.2c-15.7 16.3-34.6 24.4-56.6 24.4s-40.9-8.1-56.6-24.4c-15.7-16.3-23.6-36-23.6-59.2 0-23.1 7.9-42.8 23.6-59.1z m0 0" p-id="3643" fill="currentColor"></path>
      <path d="M726.8 870l1.6-3.5c-74.6-57.9-54.3-92.3 51.2-80l1.4-1.7C638.3 753.3 429.3 674 301.8 603.2l-1.4 2.3c83.1 61.1 64.4 98.1-45 85.2l-1.1 1.8c140 30.6 344.5 107.8 472.5 177.5z m0 0" p-id="3644" fill="currentColor"></path>
      <path d="M712.3 899.6c43.4 9.2 29.1-37.1 41.8-61.4 12.8-25.2 60.8-43.7 50.9-77.6-9.5-31.8-29.4-7.4-48.2 0.7-20.2 8.8-39.5 2.1-79-5.4-27-5.2-55.5 64.1-26.3 77.5 54.5 24.5 39.8 61.7 60.8 66.2z m0 0M310.5 574.9c-42.1-9.1-28.5 35.7-40.6 59.3-12.4 24.4-59.1 42.4-49.2 75.4 9.2 30.8 28.8 7.2 46.8-0.6 19.3-8.5 38.5-2.1 77 5.2 26.1 4.9 53.9-62.2 25.5-74.9-53.3-24-39-60.1-59.5-64.4z m0 0M765.3 699.2l-1.5-3.5c-97.4 5.9-108.7-31.9-23.5-90.3l-0.2-2.1c-126.6 68.3-337 144.5-482.1 174.8l0.7 2.6c106-9 120.4 29.5 32 90.1l0.5 2C415 805.3 620.6 730.6 765.3 699.2z m0 0" p-id="3645" fill="currentColor"></path>
      <path d="M777.3 729.7c38.2-21-7-45.3-16.2-70.9-9.9-26.3 10.7-70.2-22-88.3-30.8-16.9-26.8 13.4-34.2 31.2-7.9 19.2-26.9 26.7-60.9 46.5-23.3 13.5 8.5 81.5 39.5 72.6 57.7-17.1 75.2 19.1 93.8 8.9z m0 0M242.7 752c-37.2 20.3 6.4 43.9 15.6 68.6 9.5 25.5-10.6 68.3 21.5 85.6 29.9 16.3 26.2-13.2 33.3-30.2 7.5-18.4 26.2-26.1 59.4-45.3 22.5-13.1-8.1-79.2-38.2-70.2-56.6 16.6-73.6-18.4-91.6-8.5z m0 0" p-id="3646" fill="currentColor"></path>
      </SvgComponents>
    </div>
  )
}

export const AttackGroup =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" } } >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M800 576a161 161 0 0 0-23.07 1.67l-77.11-106.13a240 240 0 1 0-344.26-0.64l-77.29 106.38A195.8 195.8 0 0 0 256 576a192 192 0 1 0 135.77 56.25 193.13 193.13 0 0 0-34.58-27.49l62.73-86.34a241.12 241.12 0 0 0 215.36 0.4L701.52 610A159.82 159.82 0 0 0 640 736c0 88.22 71.77 160 160 160s160-71.78 160-160-71.77-160-160-160zM256 880a112 112 0 1 1 112-112 112.12 112.12 0 0 1-112 112z m272-416c-88.22 0-160-71.78-160-160s71.77-160 160-160 160 71.78 160 160-71.78 160-160 160z m272 352a80 80 0 1 1 80-80 80.09 80.09 0 0 1-80 80z" fill="currentColor" p-id="5351"></path>
      </SvgComponents>
    </div>
  )
}

export const AttackSource =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" } } >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M512 549.91899c-88.613235 0-158.003174-70.955633-158.003174-159.569875 0-88.646462 69.389939-159.569875 158.003174-159.569875 88.614242 0 158.004181 70.923412 158.004181 159.569875C670.004181 478.96235 600.614242 549.91899 512 549.91899L512 549.91899zM512 311.754306c-41.87501 0-74.970051 33.846172-74.970051 78.593802 0 44.71541 33.095042 78.561582 74.970051 78.561582s74.972065-33.847179 74.972065-78.561582C586.971058 345.600478 553.87501 311.754306 512 311.754306L512 311.754306zM848.993693 553.770294c-26.20901 76.112857-67.594677 156.273359-120.012696 238.033789-32.312698 50.427423-66.908994 98.406121-101.473069 142.499281-12.14193 15.438446-23.401836 29.277971-33.552164 41.385667-6.168129 7.344161-10.60745 12.501385-12.108703 14.165753-37.305802 45.497753-102.094312 45.171525-138.68221 1.141799-2.513165-2.806166-6.951479-7.963391-13.120615-15.307552-10.151334-12.108703-21.41124-25.947222-33.553171-41.385667-34.564075-44.094167-69.161378-92.072865-101.473069-142.499281-52.418019-81.76043-93.803687-161.920933-120.011689-238.033789-20.007654-58.129026-30.712771-112.799429-30.712771-163.421179 0-207.712694 162.605609-373.908826 367.706464-373.908826S879.706464 182.636421 879.706464 390.349115C879.706464 440.970865 869.001347 495.641269 848.993693 553.770294L848.993693 553.770294zM512 97.449588c-158.362629 0-284.673341 129.085665-284.673341 292.899527 0 41.027219 9.040749 87.242876 26.404344 137.637072 23.858959 69.323485 62.43846 144.066989 111.656623 220.865529 30.843665 48.076365 63.939713 94.031241 97.034755 136.201265 11.553914 14.719536 22.292258 27.906604 31.888803 39.329624 5.678787 6.788365 9.693205 11.424027 12.500379 14.655095 4.24298 5.09077 6.201356 5.09077 11.162239-0.947471 2.023823-2.283597 6.038242-6.919259 11.717028-13.707624 9.595538-11.42302 20.333882-24.610089 31.888803-39.329624 33.095042-42.170025 66.190083-88.1249 97.034755-136.201265 49.219171-76.79854 87.797665-151.541037 111.656623-220.865529 17.363595-50.394196 26.404344-96.61086 26.404344-137.637072C796.674348 226.535253 670.362629 97.449588 512 97.449588L512 97.449588z" p-id="33084" fill="currentColor"></path>
      </SvgComponents>
    </div>
  )
}

export const Bug =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ {width:20, height:20 , ...style, display:"inline-block" } } >
      <SvgComponents width={ style.width } height={ style.height }>
        <path d="M524.8 486.4c19.2 0 32-12.8 32-32V268.8c102.4 12.8 192 76.8 236.8 172.8 6.4 19.2 25.6 25.6 44.8 12.8 19.2-6.4 25.6-25.6 12.8-44.8l-19.2-38.4c44.8-38.4 76.8-76.8 102.4-128 6.4-12.8 0-32-12.8-44.8-12.8-6.4-32 0-44.8 12.8-25.6 44.8-51.2 83.2-83.2 108.8-25.6-25.6-51.2-51.2-76.8-64 0-6.4 6.4-6.4 6.4-12.8 0-12.8 6.4-25.6 6.4-38.4C729.6 96 640 6.4 531.2 6.4S320 102.4 320 211.2c0 12.8 0 25.6 6.4 38.4 0 6.4 0 6.4 6.4 6.4-32 19.2-57.6 38.4-83.2 64-32-25.6-57.6-64-76.8-102.4-12.8-19.2-32-25.6-44.8-12.8-19.2 6.4-25.6 25.6-12.8 38.4 25.6 51.2 57.6 96 102.4 128-32 44.8-51.2 96-57.6 147.2H44.8c-19.2 0-32 12.8-32 32s12.8 32 32 32h121.6c6.4 44.8 12.8 89.6 32 128-51.2 38.4-96 89.6-121.6 147.2-6.4 12.8 0 32 12.8 44.8 6.4 0 6.4 6.4 12.8 6.4 12.8 0 25.6-6.4 32-19.2 19.2-44.8 57.6-89.6 96-121.6 44.8 64 115.2 115.2 198.4 134.4h6.4c12.8 0 25.6-6.4 32-25.6 6.4-19.2-6.4-32-25.6-38.4-128-32-217.6-153.6-217.6-288 0-153.6 115.2-275.2 262.4-294.4v185.6c6.4 25.6 19.2 44.8 38.4 44.8zM384 211.2c0-76.8 64-134.4 140.8-134.4 76.8 0 134.4 57.6 134.4 134.4v19.2c-44.8-19.2-89.6-32-140.8-32-44.8 0-89.6 6.4-134.4 25.6 6.4-6.4 0-6.4 0-12.8z" fill="currentColor" p-id="5924"></path><path d="M1004.8 960l-89.6-89.6c70.4-96 64-224-19.2-313.6-96-96-243.2-96-339.2 0s-96 243.2 0 339.2c44.8 44.8 108.8 70.4 166.4 70.4 51.2 0 102.4-19.2 140.8-51.2l89.6 89.6c6.4 6.4 12.8 6.4 25.6 6.4s19.2 0 25.6-6.4c12.8-12.8 12.8-32 0-44.8z m-396.8-108.8c-70.4-70.4-70.4-179.2 0-249.6 32-32 76.8-51.2 121.6-51.2s89.6 19.2 121.6 51.2c70.4 70.4 70.4 179.2 0 249.6s-179.2 70.4-243.2 0z" fill="currentColor" p-id="5925"></path>
      </SvgComponents>
    </div>
  )
}

export const SearchIcon = ({ style = {  }, onClick }) => <img src= { search } style={{ width:16, height:16, ...style, cursor:"pointer" }} onClick={ onClick&&onClick } />

export const Calendar =  ({ style={width:16, height:16 } })  => {
  return (
    <div style={ {width:16, height:16 , ...style, display:"inline-block" } } >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M882.6 960h-740c-28.2 0.6-51.7-21.4-52.9-49.5V201.8c0-28.6 23.2-51.8 51.8-51.8h137.8V81.1c0-9.4 7.6-17.1 17.1-17.1h51.8c9.4-0.3 17.3 7.1 17.6 16.5V150h292.6V81.1c0-9.4 7.6-17.1 17.1-17.1h51.8c9.4-0.3 17.3 7.1 17.6 16.5V150h137.8c28.6 0 51.8 23.2 51.8 51.8v708.7c-1.3 27.7-24.2 49.5-51.9 49.5z m0-740c-0.3-9.3-7.8-16.8-17.1-17.1H744.8v51.8c0 9.4-7.6 17.1-17.1 17.1h-51.8c-9.4 0.3-17.3-7.1-17.6-16.5v-53.5H365.7v51.8c0 9.4-7.6 17.1-17.1 17.1h-51.8c-9.4 0.3-17.3-7.1-17.6-16.5v-52.4H158.5c-9.3 0.3-16.8 7.8-17.1 17.1v122.4h740V218.8l1.2 1.2z m0 170.8h-740v499.8c0 9.4 7.6 17.1 17.1 17.1h705.9c9.4 0 17.1-7.6 17.1-17.1l-0.1-499.8zM779 804.6h-68.9c-9.4 0-17.1-7.6-17.1-17.1v-68.9c0-9.4 7.6-17.1 17.1-17.1H779c9.4 0 17.1 7.6 17.1 17.1v68.9c0.3 9.4-7.1 17.3-16.5 17.6h-0.6v-0.5z m0-189.6h-68.9c-9.4 0-17.1-7.6-17.1-17.1V529c0-9.4 7.6-17.1 17.1-17.1H779c9.4 0 17.1 7.6 17.1 17.1v69c0.3 9.4-7.1 17.3-16.5 17.6h-0.6v-0.6zM555.3 804.6h-68.9c-9.7 0-17.6-7.9-17.6-17.6v-68.3c0.3-9.5 8.1-17.1 17.6-17.1h68.9c9.3 0.3 16.8 7.8 17.1 17.1v68.9c0 9.5-7.6 17.3-17.1 17.6v-0.6z m0-189.6h-68.9c-9.7 0-17.6-7.9-17.6-17.6v-68.3c0.3-9.5 8.1-17.1 17.6-17.1h68.9c9.3 0.3 16.8 7.8 17.1 17.1V598c0 9.5-7.6 17.3-17.1 17.6v-0.6zM331 805.2h-68.9c-9.4 0-17.1-7.6-17.1-17.1v-69.5c0-9.4 7.6-17.1 17.1-17.1H331c9.4 0 17.1 7.6 17.1 17.1v68.9c0.3 9.4-7.1 17.3-16.5 17.6-0.2 0.1-0.4 0.1-0.6 0.1z m0-189.6h-68.9c-9.4 0-17.1-7.6-17.1-17.1V529c0-9.4 7.6-17.1 17.1-17.1H331c9.4 0 17.1 7.6 17.1 17.1v69c0.3 9.4-7.1 17.3-16.5 17.6h-0.6z" fill="currentColor"  />
      </SvgComponents>
    </div>
  )
}


export const Cc =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" } } >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M890 120H134a70 70 0 0 0-70 70v500a70 70 0 0 0 70 70h756a70 70 0 0 0 70-70V190a70 70 0 0 0-70-70z m-10 520a40 40 0 0 1-40 40H712V448a40 40 0 0 0-80 0v232h-80V368a40 40 0 0 0-80 0v312h-80V512a40 40 0 0 0-80 0v168H184a40 40 0 0 1-40-40V240a40 40 0 0 1 40-40h656a40 40 0 0 1 40 40zM696 824H328a40 40 0 0 0 0 80h368a40 40 0 0 0 0-80z" fill="currentColor" p-id="6443"></path>
      </SvgComponents>
    </div>
  )
}

export const HightEvent =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" } } >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M243.2 889.6H166.4c-57.6 0-102.4-44.8-102.4-102.4V236.8C64 179.2 108.8 128 166.4 128h518.4c57.6 0 102.4 44.8 102.4 102.4v76.8c0 19.2-12.8 32-32 32s-32-12.8-32-32V236.8c0-25.6-19.2-44.8-38.4-44.8H166.4c-19.2 0-38.4 19.2-38.4 44.8v550.4c0 19.2 19.2 38.4 38.4 38.4h76.8c19.2 0 32 12.8 32 32s-12.8 32-32 32z" fill="currentColor" p-id="3934"></path>
      <path d="M524.8 377.6H236.8c-19.2 0-32-12.8-32-32s12.8-32 32-32h281.6c19.2 0 32 12.8 32 32s-12.8 32-25.6 32zM448 550.4H236.8c-19.2 0-32-12.8-32-32s12.8-32 32-32H448c19.2 0 32 12.8 32 32s-12.8 32-32 32zM345.6 704H230.4c-19.2 0-32-12.8-32-32s12.8-32 32-32h121.6c19.2 0 32 12.8 32 32s-19.2 32-38.4 32zM928 896H364.8c-12.8 0-19.2-6.4-25.6-19.2s-6.4-19.2 0-32l281.6-480c12.8-19.2 44.8-19.2 57.6 0l281.6 480c6.4 12.8 6.4 19.2 0 32-12.8 12.8-19.2 19.2-32 19.2z m-512-64h454.4l-224-384-230.4 384z" fill="currentColor" p-id="3935"></path>
      <path d="M646.4 723.2c-19.2 0-32-12.8-32-32V576c0-19.2 12.8-32 32-32s32 12.8 32 32v115.2c0 19.2-12.8 32-32 32zM646.4 742.4c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4 38.4-19.2 38.4-38.4c-6.4-19.2-19.2-38.4-38.4-38.4z" fill="currentColor" p-id="3936"></path>
      </SvgComponents>
    </div>
  )
}

export const FallAsset = ({ style={ width:"20", height:"20" } }) => <img  src={ fallAssetPng } width={ style.width||20 } height={ style.height||20 } alt='fallAsset' />

// export const FallAsset =  ({ style={ width:"20", height:"20" } })  => {
//   return (
//     <div style={ { ...style, display:"inline-block" } } >
//       <SvgComponents width={ style.width } height={ style.height }>
//       <path d="M512 675.84c-25.6 0-46.08 20.48-46.08 46.08S486.4 768 512 768s46.08-20.48 46.08-46.08-20.48-46.08-46.08-46.08z" p-id="22958" fill="currentColor"></path><path d="M942.08 839.68c30.72-51.2 30.72-107.52 0-158.72L655.36 179.2c-30.72-51.2-81.92-81.92-138.24-81.92S409.6 128 378.88 179.2L87.04 680.96c-30.72 51.2-30.72 112.64 0 158.72 30.72 51.2 81.92 76.8 138.24 76.8h578.56c56.32 5.12 107.52-25.6 138.24-76.8z m-66.56-35.84c-15.36 25.6-46.08 46.08-76.8 46.08H220.16c-30.72 0-61.44-15.36-76.8-40.96s-15.36-61.44 0-87.04L435.2 220.16c15.36-25.6 46.08-46.08 76.8-46.08s61.44 15.36 76.8 46.08l286.72 501.76c20.48 20.48 20.48 56.32 0 81.92z" p-id="22959" fill="currentColor"></path><path d="M501.76 353.28c-20.48 5.12-35.84 25.6-35.84 51.2 0 15.36 0 30.72 5.12 46.08 5.12 56.32 5.12 107.52 10.24 163.84 0 20.48 15.36 30.72 35.84 30.72 20.48 0 35.84-15.36 35.84-35.84v-35.84c0-35.84 5.12-71.68 5.12-107.52 0-25.6 5.12-46.08 5.12-71.68 0-10.24 0-15.36-5.12-25.6-10.24-10.24-35.84-20.48-56.32-15.36z" p-id="22960" fill="currentColor"></path>
//       </SvgComponents>
//     </div>
//   )
// }

// export const Situation =  ({ style={ width:"20", height:"20" } })  => {
//   return (
//     <div style={ { ...style, display:"inline-block" } } >
//       <SvgComponents width={ style.width } height={ style.height }>
//       <path d="M886.784 207.36l-1.024-24.576-22.016-10.24c-7.68-3.584-192-86.528-366.592-86.528C322.56 86.016 138.24 168.96 130.048 172.544l-22.016 10.24-1.024 24.576c0 7.168-6.144 176.64 26.112 332.8l68.608-66.048c-15.872-114.688-16.384-187.904-15.872-239.104 52.736-20.992 187.392-70.144 311.296-70.144 123.904 0 258.56 49.152 311.296 70.144 0.512 58.88-2.56 211.456-35.328 333.312-45.568 161.792-224.768 251.392-275.968 274.432-43.008-18.944-174.08-83.968-243.2-198.656L366.08 522.24l110.592 92.16L655.36 418.816l3.072 66.56 71.68-3.584-9.728-197.12-189.952 9.216 3.584 71.68 65.536-3.072-130.048 142.848-110.08-92.16L158.72 630.784l12.288 24.576c90.112 181.76 303.616 263.168 312.832 266.752l13.824 5.12 13.824-5.12c11.264-4.096 273.92-104.96 337.92-332.8 44.032-165.376 37.888-373.248 37.376-381.952z" fill="#999999" p-id="23589"></path>
//       </SvgComponents>
//     </div>
//   )
// }


export const ThreatEvent =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" } } >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M990.72 555.008h-126.976v-22.016c0-12.288-0.512-24.576-2.048-36.352h128.512c16.384 0 29.184 12.8 29.184 29.184 0.512 15.872-12.288 29.184-28.672 29.184z m-209.408-244.736c-12.8-14.848-26.624-28.672-41.984-41.472l93.696-93.184c11.776-11.264 30.208-11.264 41.984 0 11.776 11.264 11.776 30.208 0 41.472l-93.696 93.184z m24.064 573.952h68.096c16.384 0 29.184 12.8 29.184 29.184 0 15.872-13.312 29.184-29.184 29.184h-721.92c-16.384 0-29.184-12.8-29.184-29.184 0-15.872 13.312-29.184 29.184-29.184H220.16v-348.672c0-160.256 131.072-290.304 292.864-290.304s292.864 130.048 292.864 290.304l-0.512 348.672z m-58.368-329.216c0-128.512-104.96-232.448-233.984-232.448-129.536 0-233.984 103.936-233.984 232.448v329.216h467.968v-329.216z m-228.864-123.904c11.264-11.264 30.208-11.264 41.472 0 11.264 11.264 11.264 29.696 0 40.96l-63.488 62.976h104.96c16.384 0 36.864 14.848 39.424 29.184 1.024 7.168 0.512 10.24 0 12.288-3.584 13.824-11.264 20.992-19.456 29.184l-114.688 113.664c-11.776 11.776-31.232 11.776-43.008 0-11.776-11.776-11.776-30.72 0-42.496l89.6-83.968H445.44c-5.632 0-9.216-0.512-15.36-1.536-11.776-1.536-20.48-4.096-27.136-10.24-9.728-14.336-6.144-29.696 5.12-40.96l110.08-109.056z m-34.304-242.688V51.2c0-15.872 13.312-29.184 29.184-29.184 16.384 0 29.184 12.8 29.184 29.184v137.216c-9.728-1.024-19.456-1.536-29.696-1.536-9.728 0-18.944 0.512-28.672 1.536zM248.832 305.152L154.112 210.944c-11.264-11.264-11.264-29.696 0-40.96s29.696-11.264 41.472 0l95.744 94.72c-15.36 12.288-29.184 25.6-42.496 40.448z m-87.04 227.84v22.016H34.816c-16.384 0-29.184-12.8-29.184-29.184 0-15.872 13.312-29.184 29.184-29.184H163.84c-1.536 11.776-2.048 24.064-2.048 36.352z" p-id="2364" fill="currentColor"></path>
      </SvgComponents>
    </div>
  )
}


export const ThreatFamliy =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" } } >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M673.792 637.5936l86.6816 86.6816a76.4928 76.4928 0 0 1 45.056-6.5536A356.7616 356.7616 0 0 0 870.4 512c0-76.544-24.0128-147.456-64.8704-205.7216a101.7344 101.7344 0 0 1-38.3488-13.2608L673.792 386.4064c26.9312 34.7136 43.008 78.2848 43.008 125.5936 0 47.3088-16.0768 90.88-43.008 125.5936z m-36.1984 36.1984A204.9024 204.9024 0 0 1 313.6512 563.2H200.448c-6.2464 17.6128-18.7392 32.256-34.816 41.3696a358.5536 358.5536 0 0 0 552.0896 200.96 77.3632 77.3632 0 0 1 6.5536-45.056l-86.6816-86.6816z m213.1968 68.5056a76.8 76.8 0 0 1-108.4416 108.4416 409.7536 409.7536 0 0 1-627.3024-237.4656 76.8 76.8 0 0 1-9.8816-148.992 409.6512 409.6512 0 0 1 620.6976-301.6704 102.4 102.4 0 1 1 135.5264 135.5264A407.7056 407.7056 0 0 1 921.6 512c0 85.4016-26.112 164.6592-70.8096 230.2976zM637.5936 350.208l93.3888-93.3888a101.7344 101.7344 0 0 1-13.312-38.3488 358.4512 358.4512 0 0 0-561.2032 247.808c20.48 8.192 36.608 24.8832 43.9808 45.7216H307.2a204.8 204.8 0 0 1 330.3936-161.792z" p-id="5637" fill="currentColor"></path>
      </SvgComponents>
    </div>
  )
}


export const ThreatIoc =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" }} >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M960.6 160.2c0-53-43.1-96.1-96.1-96.1s-96.1 43.1-96.1 96.1c0 41.7 26.7 77.2 63.8 90.5v596.6c0 13.5-5.3 26.2-15 35.8-9.7 9.7-22.4 15-35.8 15H770c-13.5 0-26.2-5.3-35.8-15s-15-22.4-15-35.8l-0.5-668.7c0-63.2-51.7-114.8-114.8-114.8H595c-63.2 0-114.8 51.7-114.8 114.8l0.5 666c0 13.5-5.3 26.2-15 35.8-9.7 9.7-22.4 15-35.8 15h-10.4c-13.5 0-26.2-5.3-35.8-15-9.7-9.7-15-22.4-15-35.8l0.5-666.2c0-63.2-51.7-114.8-114.8-114.8h-11.3c-63.2 0-114.8 51.7-114.8 114.8v594.2c-37.5 13.1-64.5 48.8-64.5 90.8 0 53 43.1 96.1 96.1 96.1 53 0 96.1-43.1 96.1-96.1 0-41.6-26.6-77.2-63.8-90.5V178.5c0-13.5 5.3-26.2 15-35.8 9.7-9.7 22.4-15 35.8-15h11.3c13.5 0 26.2 5.3 35.8 15 9.7 9.7 15 22.4 15 35.8l-0.5 666.2c0 63.2 51.7 114.8 114.8 114.8h10.4c63.2 0 114.8-51.7 114.8-114.8l-0.5-666c0-13.5 5.3-26.2 15-35.8 9.7-9.7 22.4-15 35.8-15h8.9c13.5 0 26.2 5.3 35.8 15 9.7 9.7 15 22.4 15 35.8l0.5 668.7c0 63.2 51.7 114.8 114.8 114.8h11.3c63.2 0 114.8-51.7 114.8-114.8V251c37.6-13.2 64.6-48.9 64.6-90.8zM159.7 895.6c-17.7 0-32.1-14.4-32.1-32.1s14.4-32.1 32.1-32.1 32.1 14.4 32.1 32.1-14.4 32.1-32.1 32.1z m704.8-703.3c-17.7 0-32.1-14.4-32.1-32.1s14.4-32.1 32.1-32.1c17.7 0 32.1 14.4 32.1 32.1s-14.4 32.1-32.1 32.1z" p-id="35403" fill="currentColor"></path>
      </SvgComponents>
    </div>
  )
}

export const ProIoc =  ({ style={ width:"43", height:"43" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" }} >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M72.357 331.012l-0.205 0.312 425.451 245.639c4.263 2.468 9.109 3.769 14.013 3.769 5.056 0 10.019-1.362 14.31-3.922l422.194-243.745c13.363-7.738 17.938-24.908 10.196-38.276-2.514-4.345-6.152-7.934-10.466-10.35l-420.578-243.886c-4.263-2.469-9.104-3.775-14.011-3.775-5.52 0-10.863 1.601-15.464 4.636l-421.853 243.553c-13.368 7.677-17.994 24.804-10.314 38.177 1.74 3.032 4.03 5.7 6.73 7.868zM513.158 97.119l364.988 211.658-366.506 211.606-365.794-211.2 367.312-212.064zM947.848 490.07l-79.161-45.905-55.957 32.306 65.42 37.941-366.511 211.601-365.794-211.194 65.56-37.85-55.928-32.29-79.536 45.923c-13.368 7.679-17.996 24.804-10.314 38.172 1.77 3.088 4.109 5.793 6.87 7.985l-0.177 0.298 425.286 245.542c4.263 2.468 9.106 3.769 14.011 3.769 5.056 0 10.019-1.362 14.31-3.918l422.194-243.75c13.363-7.743 17.938-24.911 10.196-38.274-2.521-4.347-6.154-7.939-10.468-10.355zM947.848 695.705l-78.834-45.718-55.952 32.304 65.089 37.752-366.511 211.606-365.794-211.195 65.233-37.668-55.926-32.286-79.212 45.737c-13.368 7.677-17.994 24.804-10.314 38.172 1.751 3.051 4.057 5.737 6.782 7.911l-0.194 0.308 425.389 245.602c4.265 2.468 9.111 3.773 14.013 3.773 5.056 0 10.019-1.362 14.31-3.918l422.194-243.75c13.363-7.743 17.938-24.916 10.196-38.274-2.514-4.347-6.148-7.939-10.467-10.355z" p-id="1862" fill="currentColor"></path>
      </SvgComponents>
    </div>
  )
}

export const CusIoc =  ({ style={ width:"43", height:"43" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" }} >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M531.2 672l6.4-25.6c0-6.4 0-6.4-6.4-6.4h-38.4c-6.4 0-6.4 0-6.4 6.4l6.4 25.6v12.8L448 966.4c0 6.4 0 12.8 6.4 19.2l44.8 32c6.4 6.4 12.8 6.4 19.2 0l44.8-32c6.4-6.4 12.8-12.8 12.8-19.2l-44.8-281.6v-12.8z" p-id="2613"></path><path d="M652.8 569.6c83.2-51.2 147.2-140.8 147.2-249.6 0-160-128-288-288-288S224 160 224 320c0 108.8 57.6 198.4 147.2 249.6C192 627.2 64 793.6 64 992c0 19.2 12.8 32 32 32s32-12.8 32-32c0-211.2 172.8-384 384-384s384 172.8 384 384c0 19.2 12.8 32 32 32s32-12.8 32-32c0-198.4-128-364.8-307.2-422.4zM288 320c0-121.6 102.4-224 224-224s224 102.4 224 224S633.6 544 512 544 288 441.6 288 320z" p-id="2614"></path>
      </SvgComponents>
    </div>
  )
}

export const TesIoc =  ({ style={ width:"43", height:"43" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" }} >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M831.7 960.2H189.8c-34.8 0-63.1-27.8-63.1-62.1v-713c0-34.2 28.3-62.1 63.1-62.1h112.1L385 244.6v2h256v-1.1L714.9 123h116.7c34.8 0 63.1 27.8 63.1 62.1v713.1c0.1 34.2-28.2 62-63 62z m-641.1-64h640.1V187H751l-47 78.1c-5 25.9-28.2 45.6-56 45.6H378c-27.4 0-50.3-19.1-55.8-44.4L268.1 187h-77.5v709.2z m641.1 0z" p-id="3636"></path><path d="M596 223.8H418c-23.7 0-43-19.3-43-43v-71.6c0-23.7 19.3-43 43-43h178c23.7 0 43 19.3 43 43v71.6c0 23.7-19.3 43-43 43z m-157-64h136v-29.6H439v29.6zM601.8 498.5l-60.1-60.1c-5.3-10.2-15.9-17.1-28.1-17.1h-1.5c-8.5-0.2-17 2.9-23.4 9.4-2.3 2.3-4.1 4.8-5.5 7.4l-60.4 60.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l13.2-13.2v150.3c0 17.5 14.2 31.7 31.7 31.7h0.7c17.5 0 31.7-14.2 31.7-31.7V532.4l11.3 11.3c12.5 12.5 32.8 12.5 45.3 0 12.3-12.5 12.3-32.7-0.2-45.2z" p-id="3637"></path>
      </SvgComponents>
    </div>
  )
}

export const SysIoc =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" }} >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M794.03 836.07h-35.12v-65.99c0-14.7-11.91-26.61-26.61-26.61s-26.61 11.91-26.61 26.61v92.59c0 14.7 11.91 26.61 26.61 26.61h61.73c14.7 0 26.61-11.91 26.61-26.61 0-14.69-11.91-26.6-26.61-26.6z" fill="#ffffff" p-id="4324"></path><path d="M551.89 963.79H184.2c-14.67 0-26.61-11.94-26.61-26.61V86.82c0-14.67 11.94-26.61 26.61-26.61h554.49c14.67 0 26.61 11.94 26.61 26.61v508.71c0 14.7 11.91 26.61 26.61 26.61s26.61-11.91 26.61-26.61V86.82C818.51 42.81 782.7 7 738.69 7H184.2c-44.01 0-79.82 35.81-79.82 79.82v850.36c0 44.01 35.81 79.82 79.82 79.82h367.69c14.7 0 26.61-11.91 26.61-26.61 0-14.69-11.91-26.6-26.61-26.6z" fill="#ffffff" p-id="4325"></path><path d="M737.63 653.02c-100.35 0-181.99 81.64-181.99 181.99S637.28 1017 737.63 1017s181.99-81.64 181.99-181.99-81.64-181.99-181.99-181.99z m0 310.77c-71.01 0-128.78-57.77-128.78-128.78s57.77-128.78 128.78-128.78S866.4 764 866.4 835.01s-57.76 128.78-128.77 128.78zM662.06 149.61H276.79c-14.69 0-26.61 11.91-26.61 26.61s11.91 26.61 26.61 26.61h385.27c14.69 0 26.61-11.91 26.61-26.61s-11.91-26.61-26.61-26.61zM688.67 376.66c0-14.69-11.91-26.61-26.61-26.61H276.79c-14.69 0-26.61 11.91-26.61 26.61 0 14.69 11.91 26.61 26.61 26.61h385.27c14.7 0 26.61-11.92 26.61-26.61zM608.85 577.1c0-14.69-11.91-26.61-26.61-26.61H276.79c-14.69 0-26.61 11.91-26.61 26.61s11.91 26.61 26.61 26.61h305.45c14.7 0 26.61-11.92 26.61-26.61zM276.79 750.93c-14.69 0-26.61 11.91-26.61 26.61s11.91 26.61 26.61 26.61H452.4c14.69 0 26.61-11.91 26.61-26.61s-11.91-26.61-26.61-26.61H276.79z" fill="#ffffff" p-id="4326"></path>
      </SvgComponents>
    </div>
  )
}

export const UserIoc =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" }} >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M651.296021 545.977859c63.557548-42.814108 105.358583-115.235534 105.358583-197.532889 0-133.333728-110.364597-241.9761-245.813498-241.9761-135.451972 0-244.160859 108.642372-244.160859 240.322437 0 82.297354 41.821501 154.739247 105.35756 197.530842-143.80522 55.979966-244.135276 191.069687-244.135276 350.748433l0 0 68.561515 0 0 0c0-158.026106 122.06815-288.197818 277.581016-306.303174 1.674129 0 43.476187-3.284813 78.595033 0l3.350304 0 0 0C708.17445 610.18009 825.215096 738.574319 825.215096 894.946762l0 0 70.239737 0 0 0C893.779681 736.921679 793.447579 600.303138 651.296021 545.977859L651.296021 545.977859zM510.841106 527.85613c-102.008278 0-183.930079-80.644715-183.930079-181.063799 0-100.419084 81.921801-181.062775 183.930079-181.062775 102.007255 0 183.929056 80.643692 183.929056 181.062775C694.770162 447.211415 612.848361 527.85613 510.841106 527.85613L510.841106 527.85613zM510.841106 527.85613" p-id="5128" fill="#ffffff"></path>
      </SvgComponents>
    </div>
  )
}

export const FileIoc =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" }} >
      <SvgComponents width={ style.width } height={ style.height }>
        <path d="M512 1024H64a32 32 0 0 1-32-32V32A32 32 0 0 1 64 0h832a32 32 0 0 1 32 32v448a32 32 0 0 1-64 0V64h-768v896H512a32 32 0 0 1 0 64z" p-id="3521" fill="#ffffff"></path>
        <path d="M704 320H256a32 32 0 0 1-32-32A32 32 0 0 1 256 256h448a32 32 0 0 1 32 32 32 32 0 0 1-32 32zM448 704H256a32 32 0 0 1 0-64h192a32 32 0 0 1 0 64zM704 512H256a32 32 0 0 1 0-64h448a32 32 0 0 1 0 64zM800 1024a32 32 0 0 1-32-32v-320a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" p-id="3522" fill="#ffffff"></path><path d="M960 864h-320a32 32 0 0 1 0-64h320a32 32 0 0 1 0 64z" p-id="3523" fill="#ffffff"></path>
      </SvgComponents>
    </div>
  )
}

export const ProjectIoc =  ({ style={ width:"20", height:"20" } })  => {
  return (
    <div style={ { ...style, display:"inline-block" }} >
      <SvgComponents width={ style.width } height={ style.height }>
      <path d="M831.9 566.1c-49.1 0-95.8-18.5-131.5-52-10.9-10.2-20.4-21.4-28.5-33.6-8.1 12.1-17.6 23.4-28.5 33.6-35.7 33.5-82.5 52-131.5 52s-95.8-18.5-131.5-52c-10.8-10.1-20.3-21.4-28.4-33.4-8.1 12.1-17.6 23.3-28.4 33.4-35.7 33.5-82.5 52-131.5 52C86.2 566.1 0 480.1 0 374.4c0-17.3 2.3-34.4 6.9-50.9 1.8-10.2 5.3-20.9 10.7-32.5L97.8 53.4C102 41.2 113.4 33 126.3 33h771.3c12.9 0 24.3 8.2 28.4 20.4l80.3 237.5c4.9 10.8 8.3 20.8 10.2 30.4 5 17.2 7.5 35.1 7.5 53.1 0 105.7-86.2 191.7-192.1 191.7z m-190.3-213h60.5l2 29.9c4.4 66.9 60.5 119.3 127.8 119.3 70.6 0 128.1-57.3 128.1-127.8 0-12.4-1.8-24.7-5.3-36.5l-0.5-1.6-0.3-1.7c-0.9-5.1-3.1-11.2-6.4-18.3l-0.8-1.6-0.6-1.7L880 117.3c-4.1-12.2-15.6-20.4-28.4-20.4H172.2c-12.9 0-24.3 8.2-28.4 20.4L77.1 314.7l-0.8 1.6c-4.4 9.3-6 15.6-6.5 19.2l-0.3 1.9-0.5 1.9c-3.3 11.4-4.9 23.2-4.9 35.2 0 70.5 57.4 127.8 128.1 127.8 67.2 0 123.4-52.4 127.8-119.3l2-29.9h60.3l2 29.9c4.4 66.9 60.5 119.3 127.8 119.3S635.5 449.9 639.9 383l1.7-29.9z" fill="#ffffff" p-id="2502"></path><path d="M352.3 436.7c-17.6 0-32-14.4-32-32V335c0-17.6 14.4-32 32-32s32 14.4 32 32v69.6c0 17.7-14.4 32.1-32 32.1zM672.1 436.7c-17.6 0-32-14.4-32-32V335c0-17.6 14.4-32 32-32s32 14.4 32 32v69.6c0 17.7-14.4 32.1-32 32.1zM415.8 959c0-17.7-14.3-32-32-32H186c-32 0-58-26-58-57.9V670.3c0-14.3-9.4-27.1-23.3-30.8-21.5-5.7-40.7 10.4-40.7 30.8v198.8c0 67.1 54.7 121.8 122 121.8h197.8c17.7 0.1 32-14.2 32-31.9zM928 831H608c-17.6 0-32-14.4-32-32s14.4-32 32-32h320c17.6 0 32 14.4 32 32s-14.4 32-32 32z" fill="#ffffff" p-id="2503"></path><path d="M800 639v320c0 17.6-14.4 32-32 32s-32-14.4-32-32V639c0-17.6 14.4-32 32-32s32 14.4 32 32z" fill="#ffffff" p-id="2504"></path>
      </SvgComponents>
    </div>
  )
}



