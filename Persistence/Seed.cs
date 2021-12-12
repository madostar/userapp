using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {

            if (context.Users.Any()) return;
            
            

            var users = new List<User>{
                new User
                {
                    Username = "mastermind",
                    FirstName = "Mike",
                    LastName = "Morhaime",
                    LastLogin = DateTime.Now,
                    Enabled = true
                },
                new User
                {
                    Username = "aurilia",
                    FirstName = "Aurora",
                    LastName = "Peterson",
                    LastLogin = DateTime.Now,
                    Enabled = true
                },
                new User
                {
                    Username = "xXdemonicXx",
                    FirstName = "Kyle",
                    LastName = "Bezos",
                    LastLogin = DateTime.Now,
                    Enabled = false
                }
            };
            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();
        }
    }
}