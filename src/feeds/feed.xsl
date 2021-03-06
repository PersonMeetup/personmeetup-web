<?xml version="1.0" encoding="utf-8"?>
<!--
# Simple Atom Feed
Copied from Nicolas Hoizey's GitHub, minus the aboutfeeds.com referral:
https://github.com/nhoizey/nicolas-hoizey.com/blob/main/src/assets/pretty-atom-feed-v3.xsl
-->
<xsl:stylesheet
    version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="4.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="atom:feed/atom:title"/></title>
        <style type="text/css">*{box-sizing:border-box}body{background-color:#fff;color:#24292e;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";line-height:1.5}a{color:#0366d6;text-decoration:none}a:hover{text-decoration:underline}.container{max-width:40rem;margin:1rem auto;padding:1rem}p{margin-top:0;margin-bottom:1rem}h1,h2,h3{margin-top:0;margin-bottom:1rem;font-weight:600;line-height:1.25}h1{padding-bottom:.3em;font-size:2em}h1 svg{padding-right:.25rem;vertical-align:text-bottom;width:1.2em;height:1.2em}h2{margin-top:1.5rem;padding-bottom:.3em;font-size:1.5em;border-bottom:1px solid #eaecef}h3{font-size:1.25em;margin-bottom:0.2em}header{padding-top:2rem;padding-bottom:2rem}.item{padding-bottom:2rem}.gray{color:#586069}</style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>
              <svg xmlns="http://www.w3.org/2000/svg" aria-label="RSS" role="img" viewBox="0 0 512 512"><rect width="512" height="512" rx="15%" fill="#f80"/><circle cx="145" cy="367" r="35" fill="#fff"/><path fill="none" stroke="#fff" stroke-width="60" d="M109 241c89 0 162 73 162 162m114 0c0-152-124-276-276-276"/></svg>
              Web Feed Preview
            </h1>
            <h2><xsl:value-of select="atom:feed/atom:description"/> from Person Meetup</h2>
            <p>
							<a>
								<xsl:attribute name="href">
									<xsl:value-of select="/atom:feed/atom:link[not(@rel)]/@href"/>
								</xsl:attribute>
								Browse &#x2192;
							</a>
							 | 
							<a href="https://personmeetup.ca/feeds/">See Other Feeds &#x2192;</a>
						</p>
          </header>
          <h2>Recent Items</h2>
          <xsl:apply-templates select="atom:feed/atom:entry" />
        </div>
      </body>
    </html>
  </xsl:template>
  <xsl:template match="atom:feed/atom:entry">
    <div class="item">
      <h3>
        <a>
          <xsl:attribute name="href">
            <xsl:value-of select="atom:link/@href"/>
          </xsl:attribute>
          <xsl:value-of select="atom:title"/>
        </a>
      </h3>
			<p>
				<xsl:value-of select="atom:summary"/>
			</p>
      <small class="gray">
        Published: <xsl:value-of select="atom:updated" />
      </small>
    </div>
  </xsl:template>
</xsl:stylesheet>