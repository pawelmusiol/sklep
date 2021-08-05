import Image from "next/image"

const ImageProduct = ({src, onClick}) => {
	return(
		<div className="product-image">
			<Image 
			onClick={onClick}
			src={src}
			layout="fill"
			/>
		</div>
	)
}

export default ImageProduct