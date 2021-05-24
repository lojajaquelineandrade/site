const file = await Deno.open('wp_posts.json')
const decoder = new TextDecoder('utf-8')
const data = JSON.parse(decoder.decode(await Deno.readAll(file)))

data[2].data.forEach(row => {
  try {
    Deno.mkdirSync('../authors/'+row.author+'/pt/', {recursive: true})
    Deno.writeTextFileSync(
      '../authors/'+row.author+'/pt/'+row.title+'.html',
      row.content
    )
  } catch (err) {
    console.log(row)
    console.log(err)
  }
})
