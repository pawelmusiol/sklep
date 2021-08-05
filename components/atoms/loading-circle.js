const LoadingCircle = () => {
	const Circle = "/icons/circle.svg";
	const Size = 24;
	return (
		<div className="loading">
			<div className="loading-circle">
				<img height={Size} width={Size} src={Circle} className="circle-1" />
				<img height={Size} width={Size} src={Circle} className="circle-2" />
				<img height={Size} width={Size} src={Circle} className="circle-3" />
				<img height={Size} width={Size} src={Circle} className="circle-4" />
				<img height={Size} width={Size} src={Circle} className="circle-5" />
				<img height={Size} width={Size} src={Circle} className="circle-6" />
				<img height={Size} width={Size} src={Circle} className="circle-7" />
				<img height={Size} width={Size} src={Circle} className="circle-8" />
			</div>
		</div>
	)
}

export default LoadingCircle