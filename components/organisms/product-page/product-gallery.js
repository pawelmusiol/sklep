import { useState, useEffect } from "react"
import Image from "next/image"
import { ProductPageImage as ProductImage } from "../../atoms"
import { Modal, ImageList } from "../../molecules"




const ProductGallery = ({ images, code }) => {
	const [Id, setId] = useState(0)
	const [ModalVisibility, setModalVisibility] = useState(false)
	const checkId = (change) => {
		if (Id + change > images.length - 1) return 0
		else if (Id + change < 0) return images.length - 1
		else return (Id + change)
	}


	return (
		<>
			{ModalVisibility &&
				<Modal onExit={() => setModalVisibility(false)} id="image-modal">
					<div className="gallery-pop">
						<Image src={"/products/" + code + "/" + images[Id]} layout="fill" />
					</div>
				</Modal>
			}
			<div className="images-gallery">
				<ProductImage onClick={() => setModalVisibility(true)} src={"/products/" + code + "/" + images[Id]} />
				<div className="gallery-list-box">
					<img className="gallery-change left" onClick={() => setId(checkId(-1))} src="/icons/arrow.svg" />
					<ImageList active={Id} changeImage={setId} images={images} code={code} />
					<img className="gallery-change right" onClick={() => setId(checkId(1))} src="/icons/arrow.svg" />
				</div>
			</div>
		</>
	)
}

export default ProductGallery