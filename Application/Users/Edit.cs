using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Users
{
    public class Edit
    {
        public class Command : IRequest
    {
        public User User {get ; set;}
    }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var user = await context.Users.FindAsync(request.User.Id);
                
                    user.Username = request.User.Username ?? user.Username;
                    user.FirstName = request.User.FirstName ?? user.FirstName;
                    user.LastName = request.User.LastName ?? user.LastName;
                    user.Enabled = request.User.Enabled;

                    await context.SaveChangesAsync();

                    return Unit.Value;
                }
                catch (System.Exception)
                {
                    
                    throw;
                }
                
            }
        }
    }
}