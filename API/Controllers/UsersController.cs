using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net.Http;


namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public HttpResponseMessage AddUser(string username, string firstName, string lastName, bool enabled, string startDate){
             try{ 
                 return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                // Log.Error("Something has gone wrong ", ex);
                return new HttpResponseMessage(HttpStatusCode.NotFound);
                // throw;
            }
            // finally
            // {
            //     ((IDisposable)client).Dispose();
            // }
            

            
        }
        

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            try
            {
                return await _context.Users.FindAsync(id); 
            }
            catch (System.Exception)
            {
                throw;
            }
        }

    }
}