import Link from 'next/link'
import dbConnect from '../utils/dbConnect'
import { ProductsSection, Landing } from '../components/organisms'
import { useState } from 'react'

const Index = ({ }) => {

	return (
		<>
			<Landing />
			<div className="content">
				
				<ProductsSection />
			</div>
		</>
	)
}
export default Index
