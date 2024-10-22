import React from 'react'
import style from "./Loader.module.css"
function Loader() {
  return (
    <div>
      <div className={style.wrapper}>
	<svg className={style.svg}>
		<text x="50%" y="50%" dy=".35em" textAnchor="middle">
			Krayem
		</text>
	</svg>
</div>
    </div>
  )
}

export default Loader
