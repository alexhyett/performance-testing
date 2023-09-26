using Age.Models;
using Microsoft.AspNetCore.Mvc;

namespace Age.Controllers;

[ApiController]
[Route("[controller]")]
public class AgeController : ControllerBase
{
    [HttpGet("{dob}")]
    public IActionResult GetAge(string dob)
    {
        DateTime currentDate = DateTime.Now;

        if (!DateTime.TryParse(dob, out DateTime dateOfBirth))
        {
            return BadRequest("Invalid date supplied");
        }

        if (dateOfBirth > currentDate)
        {
            return BadRequest("Invalid date supplied. Date should be in the past");
        }

        // Get years and months
        int years = currentDate.Year - dateOfBirth.Year;
        int months = currentDate.Month - dateOfBirth.Month;
        if (currentDate.Month < dateOfBirth.Month)
        {
            years--;
            months = 12 - (dateOfBirth.Month - currentDate.Month);
        }

        if (currentDate.Month == dateOfBirth.Month && currentDate.Day < dateOfBirth.Day)
        {
            years--;
            months = 11;
        }

        // Get days
        int days = (currentDate - dateOfBirth.AddYears(years).AddMonths(months)).Days;

        TimeSpan age = currentDate - dateOfBirth;
        return Ok(new AgeResponse
        {
            Years = years,
            Months = months,
            Days = days,
            Hours = age.Hours,
            Minutes = age.Minutes,
            Seconds = age.Seconds
        });

    }
}
