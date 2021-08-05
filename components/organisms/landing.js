import { LandingBlock } from "../molecules"

const setDate = () => {
	let date = new Date()
	date.setMonth(date.getMonth() - 1)
	return date.getTime()
}

const Landing = () => {


	return (
		<div id="landing-container">
			<div className="landing-grid">
				<LandingBlock
					image="landing/1.jpg"
					title="Nowości"
					gridArea="a"
					href={"products?fdate=" + setDate()}
				>
					Cannibal Corpse, Vreid i inni w najnowszych wydaniach
				</LandingBlock>

				<LandingBlock
					image="landing/2.jpg"
					title="Promocje"
					gridArea="b"
					href="products?category=promo"
				>
					Najlepsze płyty w świetnych cenach
				</LandingBlock>
				<LandingBlock
					image="landing/3.jpg"
					title="Zestawy Prezentowe"
					gridArea="c"
					href="products?category=gift"
				>
					Zestawy prezentowe dla każdego każdego fana muzyki i nie tylko
				</LandingBlock>
				<LandingBlock
					image="landing/4.jpg"
					title="Limitowany wydawnictwa"
					gridArea="d"
					href="products?category=limited"
				>

				</LandingBlock>
			</div>
		</div>
	)
}

export default Landing