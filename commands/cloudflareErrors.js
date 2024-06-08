var cloudFlareErrors = {
    "1000": {"message": "DNS points to prohibited IP", "description": "An A record within your Cloudflare DNS app points to a Cloudflare IP address, or a Load Balancer Origin points to a proxied record, or\nYour Cloudflare DNS A or CNAME record references another reverse proxy (such as an nginx web server that uses the proxy_pass function) that then proxies the request to Cloudflare a second time, or\nThe request X-Forwarded-For header is longer than 100 characters, or\nThe request includes two X-Forwarded-For headers, or\nThe request includes a CF-Connecting-IP header, or\nA Server Name Indication (SNI) issue or mismatch at the origin", "common_causes": "- If an A record within your Cloudflare DNS app points to a Cloudflare IP address, update the IP address to your origin web server IP address. Reach out to your hosting provider if you need help obtaining the origin IP address.\n- There is a reverse-proxy at your origin that sends the request back through the Cloudflare proxy. Instead of using a reverse-proxy, contact your hosting provider or site administrator to configure an HTTP redirect at your origin"},
    "1004": {"message": "Host Not Configured to Serve Web Traffic", "description": "The host is not configured in the Cloudflare dashboard.", "common_causes": "- Cloudflare staff disabled proxying for the domain due to abuse or terms of service violations.\n-DNS changes have not yet propagated or the site owner’s DNS A records point to Cloudflare IP addresses"}
};

function returnCloudFlareError(code) {
    if (code in cloudFlareErrors) {
        return cloudFlareErrors[code];
    } else {
        return {"message": "Unknown Cloudflare Error\n# Function WORK IN PROGRESS", "description": "The Cloudflare error code provided is not recognized."};
    }
}

module.exports = {
    name: 'cloudflareerrors',
    description: 'Get description of Cloudflare error codes',
    help: 'Get description of Cloudflare error codes *WORK IN PROGRESS*',
    options: [
        {
            name: 'r',
            type: 4, // Integer type
            description: 'Cloudflare error code (e.g. 1004)',
            required: true
        },
    ],
    slash: false,
    text: false,
    admin: false,
    requireKick: false,
    requireBan: false,
    canBeUsedInDm: true,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
    integration_types: [0,1],
    execute(message, args) {
        //check if the user provided the 3 values 0-255
        const codeER = args.r;
        const errorCF = returnCloudFlareError(codeER);
        if(errorCF.common_causes != null) {
            message.reply(`# Cloudflare ${codeER} ${errorCF.message}: \n${errorCF.description}\n\nCommon Causes:\n${errorCF.common_causes}`);
        }
        else {
            message.reply(`# Cloudflare ${codeER} ${errorCF.message}: \n${errorCF.description}`);
        }
    },
    executeSlash(interaction) {
        const codeER = interaction.options.getInteger('r');
        const errorCF = returnCloudFlareError(codeER);
        if(errorCF.common_causes != null) {
            interaction.reply(`# Cloudflare ${codeER} ${errorCF.message}: \n${errorCF.description}\n\nCommon Causes:\n${errorCF.common_causes}`);
        }
        else {
            interaction.reply(`# Cloudflare ${codeER} ${errorCF.message}: \n${errorCF.description}`);
        }
    },
};
