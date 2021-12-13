using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using MediatR;
using Application.Users;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {


        

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            try
            {
                return await Mediator.Send(new Details.Query{Id = id});
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            return Ok(await Mediator.Send(new Create.Command {User = user}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(Guid id, User user)
        {
            user.Id = id;
            return Ok(await Mediator.Send(new Edit.Command {User = user}));
        }

    }
}