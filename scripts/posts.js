const file = await Deno.open('wp_posts.json')
const decoder = new TextDecoder('utf-8')
const data = JSON.parse(decoder.decode(await Deno.readAll(file)))

data[2].data.forEach(row => {
  try {
    Deno.mkdirSync('../authors/'+row.user+'/pt/', {recursive: true})
    Deno.writeTextFileSync(
      '../authors/'+row.user+'/pt/'+row.name+'.html',
      row.content
    )
    Deno.writeTextFileSync(
      '../authors/'+row.user+'/pt/'+row.name+'.json',
      JSON.stringify({
        title: row.title,
        date: row.date
      }, undefined, 2)
    )
  } catch (err) {
    console.log(row)
    console.log(err)
  }
})
