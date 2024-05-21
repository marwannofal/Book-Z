using System.Text.Json.Serialization;

namespace API.Entities.Enum
{
    [JsonConverter(typeof(ConditionConverter))]
    public enum Condition
    {
        New ,
        Like_New,
        Used,
        Damaged
    }
}