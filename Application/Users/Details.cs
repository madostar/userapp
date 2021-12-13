using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Users
{
    public class Details
    {
        public class Query : IRequest<User>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Users.FindAsync(request.Id);
            }
        }
    }
}