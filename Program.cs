using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/deezer", async ([FromServices] HttpClient http, string q) =>
{
    var url = $"https://api.deezer.com/search/artist?q={Uri.EscapeDataString(q)}";
    var response = await http.GetFromJsonAsync<object>(url);
    return Results.Json(response);
});

app.Run();
