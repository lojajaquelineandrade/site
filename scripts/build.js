import mustache from 'https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.mjs'

async function read (name, json) {
  const file = await Deno.open(name)
  const decoder = new TextDecoder('utf-8')
  const data = decoder.decode(await Deno.readAll(file))
  return json ? JSON.parse(data) : data
}

const Posts = []
for await (const a of Deno.readDir('../authors')) {
  for await (const p of Deno.readDir(`../authors/${a.name}/pt`)) {
    const A = p.name.split('.')
    const ext = A.pop()
    const path = A.join('.')
    if (ext == 'html') {
      const meta = await read(`../authors/${a.name}/pt/${path}.json`, true)
      const content = await read(`../authors/${a.name}/pt/${path}.html`)
      Posts.push({
        ...meta,
        path: path,
        user: a.name,
        content: content
      })
    }
  }
}
Posts.sort((a, b) => a.date > b. date ? -1 : (a.date < b.date ? 1 : 0))
console.log(Posts)

const views = {
  head: await read(`../templates/head.html`),
  main: await read(`../templates/main.html`),
  post: await read(`../templates/post.html`)
}

Deno.mkdirSync('../public/', {recursive: true})
Deno.writeTextFileSync(
  '../public/index.html',
  mustache.render([
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    views.head,
    '</head>',
    '<body>',
    views.main,
    '</body>',
    '</html>'
  ].join('\n'), {posts: Posts})
)

Posts.forEach(post => {
  Deno.mkdirSync(`../public/${post.path}`, {recursive: true})
  Deno.writeTextFileSync(
    `../public/${post.path}/index.html`,
    mustache.render([
      '<!DOCTYPE html>',
      '<html>',
      '<head>',
      views.head,
      '</head>',
      '<body>',
      views.post,
      '</body>',
      '</html>'
    ].join('\n'), post)
  )
})
