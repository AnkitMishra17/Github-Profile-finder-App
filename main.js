$(document).ready(() =>{
    $('#searchForm').on('submit', (e) =>{
        e.preventDefault();
        let username = $('#Search_users').val();
        
        $.ajax({
            url: 'https://api.github.com/users/'+username,
            data:{

                client_id:  '795c1cdb897b1bbffe71',
                client_secret: '539d9d06431a0d0e7ef6a03099e49812053aceb2'
                
            }
        }).done(function(user){
            $.ajax({
            url: 'https://api.github.com/users/'+username+'/repos',
            data:{

                client_id:  '795c1cdb897b1bbffe71',
                client_secret: '539d9d06431a0d0e7ef6a03099e49812053aceb2',
                sort: 'created: asc',
                per_page: 5
            }
        }).done(function(repos){
               $.each(repos,function(index,repo){
                      $('#repos').append(`
                       <div class="well mt-3">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}:</strong>${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span><strong>Forks:</strong> ${repo.forks_count}</span>
                                    <span><strong>Watchers:</strong> ${repo.watchers}</span>
                                    <span><strong>Stars:</strong> ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-outline btn-outline-primary">Repo Page</a>
                                </div>                
                            </div>
                        </div>
                    `)
                 }) 
                
            });
            $('#profile').html(`                          
                            <div class="panel panel-default">
                                  <div class="panel-heading">
                                        <h3 class="panel-title display-4">${user.name}</h3>
                                  </div>
                            </div>
                            
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3 mt-5">
                            <img src="${user.avatar_url}" class="thumbnail avatar">
                            <a href="${user.html_url}" class="btn btn-success mt-3 w-50">View Profile</a>
                        </div>
                        <div class="col-md-9 text-center">
                            <span><strong>Public Repos:</strong> ${user.public_repos}</span>
                            <span><strong>Public Gists:</strong> ${user.public_gists}</span>
                            <span><strong>Followers:</strong> ${user.followers}</span>
                            <span><strong>Following:</strong> ${user.following}</span>
                            <ul class="list-group mt-3">
                                <li class="list-group-item"><strong  class="mr-3">Company:</strong>${user.company}</li>
                                <li class="list-group-item"><strong>Organizations:</strong>${user.organizations_url}</li>
                                <li class="list-group-item"><strong>Website/Blog:</strong>${user.blog}</li>
                                <li class="list-group-item"><strong>Location:</strong>${user.location}</li>
                                <li class="list-group-item"><strong>Member Since:</strong>${user.created_at}</li>
                            </ul>
                        </div>
                    </div>
                </div>
              <h3 class="page-header mt-3">Latest Repos</h3>
              <div id="repos"></div>      
            `)
        })
    })
})