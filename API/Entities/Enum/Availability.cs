using System.ComponentModel;
using System.Text.Json.Serialization;

namespace API.Entities.Enum
{
    [JsonConverter(typeof(EnumConverter))]
    public enum Availability
    {
        Available ,
        completed
    }
}