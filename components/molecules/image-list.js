import Image from "next/image"

const ImageList = ({ active, images, code, changeImage }) => {
	let ImageMini = {}
	if (images) {
		ImageMini = images.map((image, key) => {
			let className = "image-mini "
			if(active === key) className += " image-mini-active"
			return (
				<div onClick={() => changeImage(key)} className={className}>
					<Image key={key} layout="fill" src={"/products/" + code + "/" + image} />
				</div>
			)
		})
	}
	return (
		<div className="images-list">
			{ImageMini}
		</div>
	)
}

export default ImageList