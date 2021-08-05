import { ALink } from '../atoms'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"


const ChangePage = ({ PageIndex, path, page, active, children }) => {
	let pathTo = "products"
	let className = "pagination-button login-button"
	if (path.length) {
		pathTo = path
	}
	if (active) {
		className += " pagination-active"
	}
	if (PageIndex === 4) {
		if (path.indexOf("?") !== -1) {
			pathTo += "&page=" + page
		}
		else {
			pathTo += "?page=" + page
		}

	}
	else {
		pathTo = pathTo.slice(0, PageIndex) + page + pathTo.slice(PageIndex + 1)
	}
	return (
		<ALink className={className} to={pathTo}>{children}</ALink>
	)
}

const ChangeLimit = ({ LimitIndex, path, limit, children }) => {
	let pathTo = "products"
	if (path.length) {
		pathTo = path
	}

	if (LimitIndex === 5) {
		if (path.indexOf("?") !== -1) {
			pathTo += "&limit=" + limit
		}
		else {
			pathTo += "?limit=" + limit
		}

	}
	else {
		pathTo = pathTo.slice(0, LimitIndex) + limit + pathTo.slice(LimitIndex + 1)
	}

	return (
		<ALink className="pagination-button login-button" to={pathTo}>{children}</ALink>
	)
}

const setPaginationButtons = (PageCount, PageIndex, path, Page) => {
	let PaginationButtons = []


	for (let i = 0; i < PageCount; i++) {
		let active = false
		if (Page === (i + 1)) {
			active = true
		}
		PaginationButtons.push(
			<ChangePage PageIndex={PageIndex} path={path} page={i + 1} active={active}>
				{i + 1}
			</ChangePage>)
	}
	return PaginationButtons
}

const usePrev = (Page) => {
	const [Prev, setPrev] = useState(1)
	useEffect(() => {
		if (Page === 1) {
			setPrev(1)
		}
		else setPrev(Page - 1)
	}, [Page])
	return Prev
}
const useNext = (Page, PageCount) => {
	const [Next, setNext] = useState(1)
	useEffect(() => {
		if (Page === PageCount) {
			setNext(PageCount)
		}
		else setNext(Page + 1)
	}, [Page])
	return Next
}

const Pagination = ({ itemCount }) => {
	const [Limit, setLimit] = useState(20)
	const [Page, setPage] = useState(1)
	const [PageCount, setPageCount] = useState(1)
	const [PageIndex, setPageIndex] = useState(-1)
	const [LimitIndex, setLimitIndex] = useState(-1)
	let router = useRouter()
	useEffect(() => {
		if (router.isReady) {
			if (router.query.limit) {
				setLimit(parseInt(router.query.limit))
			}
			if (router.query.page) {
				setPage(parseInt(router.query.page))
			}
			if (itemCount) {
				setPageCount(Math.ceil(itemCount / Limit))
			}

			setPageIndex(router.asPath.indexOf("page=") + 5)
			setLimitIndex(router.asPath.indexOf("limit=") + 6)
		}
	}, [router, itemCount, Limit])
	const Prev = usePrev(Page)
	const Next = useNext(Page, PageCount)

	let PaginationButtons = setPaginationButtons(PageCount, PageIndex, router.asPath, Page)

	return (
		<div className="pagination-box">
			<ChangePage PageIndex={PageIndex} path={router.asPath} page={Prev}>{"<"}</ChangePage>
			{PaginationButtons}
			<ChangePage PageIndex={PageIndex} path={router.asPath} page={Next}>{">"}</ChangePage>
			<ChangeLimit LimitIndex={LimitIndex} path={router.asPath} limit={3}>3</ChangeLimit>
			<ChangeLimit LimitIndex={LimitIndex} path={router.asPath} limit={2}>2</ChangeLimit>
		</div>
	)
}

export default Pagination