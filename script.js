const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Backend Development', className: 'backend' }
};

const postsContainer = document.getElementById("posts-container")

const timeAgo = (timeStamp) => {
  const then = new Date(timeStamp)
  const now = new Date()
  const diff = now - then

  const diffMinutes = Math.floor(diff / 1000 / 60)
  if(diffMinutes < 60){
    return `${diffMinutes}m ago`
  }

  const diffHours = Math.floor(diffMinutes / 60)
  if(diffHours < 24){
    return `${diffHours}h ago`
  }

  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

const viewCount = (numViews) => {
  return (numViews >= 1000) ? `${Math.floor(numViews / 1000)}k` : numViews
}

// console.log(viewCount(2730))

const forumCategory = (id) => {
  if(allCategories.hasOwnProperty(id)){
    return `<a href="${forumCategoryUrl}${allCategories[id].className}/${id}" class="category ${allCategories[id].className}">${allCategories[id].category}</a>`
  }

  else{
    return `<a href="${forumCategoryUrl}general/${id}" class="category general">General</a>`
  }
}
console.log(forumCategory(200))

const avatars = (posters, users) => {
  return posters.map((poster) => {
    const user = users.find((u) => u.id === poster.user_id)

    if(!user){
      return ""
    }
    let src =
    user.avatar_template.replace("{size}", "30")

    if(src.startsWith("/")){
      src = `${avatarUrl}${src}`
    }

    return `<img src="${src}" alt="${user.name}" />`
  })
  .join("")
}

const showLatestPosts = (obj) => {
  const {users, topic_list} = obj
  const {topics} = topic_list

  postsContainer.innerHTML =   topics.map(({id, title, views, posts_count, slug, posters, category_id, bumped_at}) => {
    return `
    <tr>
      <td>
        <a href="${forumTopicUrl}${slug}/${id}" class="post-title">${title}</a>
        ${forumCategory(category_id)}
      </td>
      <td>
        <div class="avatar-container">${avatars(posters, users)}</div>
      </td>
      <td>${posts_count-1}</td>
      <td>${viewCount(views)}</td>
      <td>${timeAgo(bumped_at)}</td>

    </tr>
    `
  }).join("")
}

async function fetchData(){
  try{
    let response = await fetch(forumLatest)
    let userData = await response.json()
    showLatestPosts(userData)
  }
  catch (error){
    console.log(error)
  }
}

