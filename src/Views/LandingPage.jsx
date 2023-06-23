import { useEffect, useState } from "react"
import { getUserById, putUserProject } from "../API/UserAPI"
import { getProjectById, postProject } from "../API/ProjectAPI"
import { getTasksByProjectId } from "../API/TaskAPI"

const LandingPage = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentProject, setCurrentProject] = useState(null)
  const [currentTasks, setCurrentTasks] = useState(null)

  const getUser = async () => {
    const user = await getUserById(3)
    setCurrentUser(user)
  }
  const getProject = async () => {
    const project = await getProjectById(currentUser.projectId)
    setCurrentProject(project)
  }
  const getTasks = async () => {
    const tasks = await getTasksByProjectId(currentProject.id)
    console.log(tasks)
    if(tasks.constructor === Array)
      setCurrentTasks(tasks)
  }

  useEffect(() => {
    getUser()
  }, [])
  useEffect(() => {
    if(currentUser?.projectId ?? null !== null)
      getProject()
  }, [currentUser])
  useEffect(() => {
    if(currentProject?.id ?? null !== null)
      getTasks()
  }, [currentProject])

  const handleCreateProject = async () => {
    const project = {
      name: "Scrum-like App",
      projectMasterId: 3
    }
    const projectId = (await postProject(project)).split("projects/")[1]

    await putUserProject(currentUser.id, projectId)

    setCurrentUser({...currentUser, projectId})
  }

  return (
    <>
      <h1>Landing Page</h1>
      {currentUser && <h2>Hello, {currentUser.name}</h2>}
      <div style={{margin:"auto", padding:"10px", width:"720px", border:"1px solid black"}}>
        <div style={{width:"100%"}}>
          {currentProject ?
            <>
            <h4>Project: {currentProject.name}</h4>
            <h4>Backlog:</h4>
            {currentTasks === null ?
              <p>No tasks.</p>
              :
              currentTasks.map(x => 
              <div key={x.id} style={{padding:"10px", border:"1px solid black"}}>
                <p>Title: {x.title}</p>
                <p>Description: {x.description}</p>
              </div>
            )}
            </>
            : 
            <>
            <h4>No current project.</h4>
            <button onClick={handleCreateProject}>Create project!</button>
            </>
          }
        </div>
      </div>
    </>
  );
}

export default LandingPage;