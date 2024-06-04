var httpErrors = {
    100: {"name": "Continue", "description": "The server has received the request headers and the client should proceed to send the request body."},
    101: {"name": "Switching Protocols", "description": "The requester has asked the server to switch protocols."},
    102: {"name": "Processing", "description": "This code indicates that the server has received and is processing the request, but no response is available yet."},
    103: {"name": "Early Hints", "description": "This status code is primarily intended to be used with the Link header, letting the user agent start preloading resources while the server prepares a response."},
    200: {"name": "OK", "description": "The request has succeeded."},
    201: {"name": "Created", "description": "The request has been fulfilled, resulting in the creation of a new resource."},
    202: {"name": "Accepted", "description": "The request has been accepted for processing, but the processing has not been completed."},
    203: {"name": "Non-Authoritative Information", "description": "The server successfully processed the request, but is returning information that may be from another source."},
    204: {"name": "No Content", "description": "The server successfully processed the request, but is not returning any content."},
    205: {"name": "Reset Content", "description": "The server successfully processed the request, but is not returning any content."},
    206: {"name": "Partial Content", "description": "The server is delivering only part of the resource due to a range header sent by the client."},
    207: {"name": "Multi-Status", "description": "The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made."},
    208: {"name": "Already Reported", "description": "The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again."},
    226: {"name": "IM Used", "description": "The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance."},
    300: {"name": "Multiple Choices", "description": "The request has more than one possible response."},
    301: {"name": "Moved Permanently", "description": "The URL of the requested resource has been changed permanently."},
    302: {"name": "Found", "description": "The URL of the requested resource has been changed temporarily."},
    303: {"name": "See Other", "description": "The server sent this response to direct the client to get the requested resource at another URI with a GET request."},
    304: {"name": "Not Modified", "description": "This is used for caching purposes."},
    305: {"name": "Use Proxy", "description": "Defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy."},
    306: {"name": "Switch Proxy", "description": "No longer used."},
    307: {"name": "Temporary Redirect", "description": "The request should be repeated with another URI."},
    308: {"name": "Permanent Redirect", "description": "The request and all future requests should be repeated using another URI."},
    400: {"name": "Bad Request", "description": "The server could not understand the request due to invalid syntax."},
    401: {"name": "Unauthorized", "description": "The client must authenticate itself to get the requested response."},
    402: {"name": "Payment Required", "description": "Reserved for future use."},
    403: {"name": "Forbidden", "description": "The client does not have access rights to the content, i.e. they are unauthorized."},
    404: {"name": "Not Found", "description": "The server can not find the requested resource."},
    405: {"name": "Method Not Allowed", "description": "The request method is known by the server but has been disabled and cannot be used."},
    406: {"name": "Not Acceptable", "description": "The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request."},
    407: {"name": "Proxy Authentication Required", "description": "The client must first authenticate itself with the proxy."},
    408: {"name": "Request Timeout", "description": "The server timed out waiting for the request."},
    409: {"name": "Conflict", "description": "The request could not be completed because of a conflict in the request."},
    410: {"name": "Gone", "description": "The requested resource is no longer available and will not be available again."},
    411: {"name": "Length Required", "description": "The request did not specify the length of its content, which is required by the requested resource."},
    412: {"name": "Precondition Failed", "description": "The server does not meet one of the preconditions that the requester put on the request."},
    413: {"name": "Payload Too Large", "description": "The request is larger than the server is willing or able to process."},
    414: {"name": "URI Too Long", "description": "The URI provided was too long for the server to process."},
    415: {"name": "Unsupported Media Type", "description": "The request entity has a media type which the server or resource does not support."},
    416: {"name": "Range Not Satisfiable", "description": "The client has asked for a portion of the file, but the server cannot supply that portion."},
    417: {"name": "Expectation Failed", "description": "The server cannot meet the requirements of the Expect request-header field."},
    418: {"name": "I'm a teapot", "description": "The server refuses the attempt to brew coffee with a teapot."},
    421: {"name": "Misdirected Request", "description": "The request was directed at a server that is not able to produce a response."},
    422: {"name": "Unprocessable Entity", "description": "The request was well-formed but was unable to be followed due to semantic errors."},
    423: {"name": "Locked", "description": "The resource that is being accessed is locked."},
    424: {"name": "Failed Dependency", "description": "The request failed due to failure of a previous request."},
    425: {"name": "Too Early", "description": "Indicates that the server is unwilling to risk processing a request that might be replayed."},
    426: {"name": "Upgrade Required", "description": "The client should switch to a different protocol."},
    428: {"name": "Precondition Required", "description": "The origin server requires the request to be conditional."},
    429: {"name": "Too Many Requests", "description": "The user has sent too many requests in a given amount of time."},
    431: {"name": "Request Header Fields Too Large", "description": "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large."},
    451: {"name": "Unavailable For Legal Reasons", "description": "The user requests an illegal resource, such as a web page censored by a government."},
    500: {"name": "Internal Server Error", "description": "The server has encountered a situation it doesn't know how to handle."},
    501: {"name": "Not Implemented", "description": "The request method is not supported by the server and cannot be handled."},
    502: {"name": "Bad Gateway", "description": "The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request."},
    503: {"name": "Service Unavailable", "description": "The server is not ready to handle the request."},
    504: {"name": "Gateway Timeout", "description": "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI or some other auxiliary server it needed to access in order to complete the request."},
    505: {"name": "HTTP Version Not Supported", "description": "The server does not support the HTTP protocol version used in the request."},
    506: {"name": "Variant Also Negotiates", "description": "Transparent content negotiation for the request results in a circular reference."},
    507: {"name": "Insufficient Storage", "description": "The server is unable to store the representation needed to complete the request."},
    508: {"name": "Loop Detected", "description": "The server detected an infinite loop while processing the request."},
    510: {"name": "Not Extended", "description": "Further extensions to the request are required for the server to fulfill it."},
    511: {"name": "Network Authentication Required", "description": "The client needs to authenticate to gain network access."}
};

function returnHttpError(code) {
    if (code in httpErrors) {
        return httpErrors[code];
    } else {
        return {"name": "Unknown HTTP Error", "description": "The HTTP error code provided is not recognized."};
    }
}

module.exports = {
    name: 'httperrors',
    description: 'Get description of HTTP error codes',
    help: 'Get description of HTTP error codes',
    options: [
        {
            name: 'r',
            type: 4, // Integer type
            description: 'HTTP error code (e.g. 404)',
            required: true
        },
    ],
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    requireBan: false,
    canBeUsedInDm: true,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
    integration_types: [0,1],
    execute(message, args) {
        //check if the user provided the 3 values 0-255
        const code = args.r;
        const error = returnHttpError(code);
        message.reply(`# HTTP ${code} ${error.name}: \n${error.description}`);
    },
    executeSlash(interaction) {
        const code = interaction.options.getInteger('r');
        const error = returnHttpError(code);
        interaction.reply(`# HTTP ${code} ${error.name}: \n${error.description}`);
    },
};
