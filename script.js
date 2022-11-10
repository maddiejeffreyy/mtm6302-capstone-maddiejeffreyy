const $cardcontainer = document.getElementById('card-container')

const pokemon = []

for (let i = 0; i < 20; i++)
    pokemon.push(`
    <div class="card" style="width: 18rem;">
        <h5 class="card-title">Card title</h5>
        <div class="card-body">
            <img class="card-img-top" src="..." alt="Card image cap">
            <a href="#" class="btn btn-primary">catch</a>
  </div>
</div>
`)