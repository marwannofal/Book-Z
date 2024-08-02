using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

public class ExchangeService : IExchangeService
{
    private readonly ApplicationDbContext _context;
    public ExchangeService(ApplicationDbContext context)
    {
        _context = context;
    }
//==============================================================
    public async Task<bool> CanUserExchangeAsync(int userId)
    {
        var twoMonthsAgo = DateTime.UtcNow.AddMonths(-2);
        var exchangeCount = await _context.BookExchanges
            .Where(be => be.UserId == userId && be.ExchangeDate >= twoMonthsAgo)
            .CountAsync();

        return exchangeCount < 4;
    }
//==============================================================
    public async Task LogExchangeAsync(int userId, int bookId)
    {
        var exchange = new BookExchange
        {
            UserId = userId,
            BookId = bookId,
            ExchangeDate = DateTime.UtcNow
        };
        _context.BookExchanges.Add(exchange);
        await _context.SaveChangesAsync();
    }
}
