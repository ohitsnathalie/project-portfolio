import { ProjectElement } from "./ProjectElement.jsx"
import "../../styling/projects.css"
import { useEffect, useState } from "react"

export const Projects = () => {
	const [repos, setRepos] = useState([])

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				const response = await fetch(
					"https://api.github.com/users/ohitsnathalie/repos"
				)
				if (!response.ok) {
					throw new Error("Network response was not ok" + response.statusText)
				}
				const data = await response.json()
				setRepos(data)
			} catch (error) {
				console.error(
					"There has been a problem with your fetch operation:",
					error
				)
			}
		}

		fetchRepos()
	}, [])

	return (
		<div className='project-container'>
			<h2>Featured Projects</h2>
			<div className='single-project-wrapper'>
				{repos &&
					repos.map((repo) => {
						return (
							<ProjectElement
								key={repo.id}
								name={repo.name}
								description={repo.description}
								homepage={repo.homepage}
								github={repo.svn_url}
								topics={repo.tpoics}
							/>
						)
					})}
			</div>
		</div>
	)
}