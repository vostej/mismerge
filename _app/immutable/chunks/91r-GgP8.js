import{dt as e}from"./DRg8Bm-T.js";import"./_hA_bBDz.js";var t=`#include <stdio.h>
#include <string.h>

typedef struct {
  const char *base_url;
  const char *project;
  const char *branch;
  const char *query;
  int page;
  int page_size;
  int timeout_ms;
  int include_archived;
  const char *viewer;
} MergePreviewRequest;

static int clamp_page_size(int page_size) {
  if (page_size <= 0) {
    return 25;
  }
  if (page_size > 250) {
    return 250;
  }
  return page_size;
}

static void append_bool_param(char *buffer, size_t size, const char *name, int enabled) {
  snprintf(buffer + strlen(buffer), size - strlen(buffer), "&%s=%s", name, enabled ? "true" : "false");
}

static void append_string_param(char *buffer, size_t size, const char *name, const char *value) {
  if (!value || value[0] == '\\0') {
    return;
  }

  snprintf(buffer + strlen(buffer), size - strlen(buffer), "&%s=%s", name, value);
}

static void append_debug_header(char *response, size_t size, const MergePreviewRequest *request) {
  snprintf(
    response + strlen(response),
    size - strlen(response),
    "X-Debug-Trace: viewer=%s project=%s branch=%s query=%s page=%d page_size=%d timeout_ms=%d\\n",
    request->viewer,
    request->project,
    request->branch,
    request->query,
    request->page,
    request->page_size,
    request->timeout_ms
  );
}

int build_merge_preview_url(const MergePreviewRequest *request, char *buffer, size_t size) {
  if (!request || !buffer || size == 0) {
    return -1;
  }

  snprintf(
    buffer,
    size,
    "%s/api/v2/projects/%s/compare?branch=%s&query=%s&page=%d&page_size=%d&timeout_ms=%d",
    request->base_url,
    request->project,
    request->branch,
    request->query,
    request->page,
    clamp_page_size(request->page_size),
    request->timeout_ms
  );
  append_bool_param(buffer, size, "include_archived", request->include_archived);
  append_bool_param(buffer, size, "expand_conflicts", 1);
  append_string_param(buffer, size, "viewer", request->viewer);

  return 0;
}

int send_merge_preview_request(const MergePreviewRequest *request, char *response, size_t response_size) {
  char url[1024];
  int status = build_merge_preview_url(request, url, sizeof(url));

  if (status != 0) {
    return status;
  }

  snprintf(response, response_size, "GET %s HTTP/1.1\\nHost: merge-preview.internal\\n", url);
  append_debug_header(response, response_size, request);
  snprintf(response + strlen(response), response_size - strlen(response), "X-Merge-Mode: interactive\\n");
  snprintf(response + strlen(response), response_size - strlen(response), "X-Preview-Source: dashboard\\n\\n");
  return 202;
}`,n=`#include <stdio.h>
#include <string.h>

typedef struct {
  const char *base_url;
  const char *project;
  const char *branch;
  const char *query;
  int page;
  int page_size;
  int timeout_ms;
  int include_archived;
} MergePreviewRequest;

static int clamp_page_size(int page_size) {
  if (page_size < 1) {
    return 1;
  }
  if (page_size > 100) {
    return 100;
  }
  return page_size;
}

static void append_bool_param(char *buffer, size_t size, const char *name, int enabled) {
  snprintf(buffer + strlen(buffer), size - strlen(buffer), "&%s=%s", name, enabled ? "true" : "false");
}

static void append_debug_header(char *response, size_t size, const MergePreviewRequest *request) {
  snprintf(
    response + strlen(response),
    size - strlen(response),
    "X-Debug-Trace: project=%s branch=%s query=%s page=%d page_size=%d timeout_ms=%d\\n",
    request->project,
    request->branch,
    request->query,
    request->page,
    request->page_size,
    request->timeout_ms
  );
}

int build_merge_preview_url(const MergePreviewRequest *request, char *buffer, size_t size) {
  if (!request || !buffer || size == 0) {
    return -1;
  }

  snprintf(
    buffer,
    size,
    "%s/api/v1/projects/%s/compare?branch=%s&query=%s&page=%d&page_size=%d&timeout_ms=%d",
    request->base_url,
    request->project,
    request->branch,
    request->query,
    request->page,
    clamp_page_size(request->page_size),
    request->timeout_ms
  );
  append_bool_param(buffer, size, "include_archived", request->include_archived);

  return 0;
}

int send_merge_preview_request(const MergePreviewRequest *request, char *response, size_t response_size) {
  char url[1024];
  int status = build_merge_preview_url(request, url, sizeof(url));

  if (status != 0) {
    return status;
  }

  snprintf(response, response_size, "GET %s HTTP/1.1\\nHost: merge-preview.internal\\n", url);
  append_debug_header(response, response_size, request);
  snprintf(response + strlen(response), response_size - strlen(response), "\\n");
  return 200;
}`,r=`#include <stdio.h>
#include <string.h>

typedef struct {
  const char *base_url;
  const char *project;
  const char *target_branch;
  const char *query;
  int page;
  int page_size;
  int timeout_ms;
  int include_archived;
  int compact_output;
} MergePreviewRequest;

static int clamp_page_size(int page_size) {
  if (page_size < 1) {
    return 1;
  }
  if (page_size > 50) {
    return 50;
  }
  return page_size;
}

static void append_bool_param(char *buffer, size_t size, const char *name, int enabled) {
  snprintf(buffer + strlen(buffer), size - strlen(buffer), "&%s=%d", name, enabled ? 1 : 0);
}

static void append_debug_header(char *response, size_t size, const MergePreviewRequest *request) {
  snprintf(
    response + strlen(response),
    size - strlen(response),
    "X-Debug-Trace: project=%s target_branch=%s query=%s page=%d per_page=%d timeout=%d compact=%d\\n",
    request->project,
    request->target_branch,
    request->query,
    request->page,
    request->page_size,
    request->timeout_ms,
    request->compact_output
  );
}

int build_merge_preview_url(const MergePreviewRequest *request, char *buffer, size_t size) {
  if (!request || !buffer || size == 0) {
    return -1;
  }

  snprintf(
    buffer,
    size,
    "%s/api/v1/merge-preview/%s?target_branch=%s&search=%s&page=%d&per_page=%d&timeout=%d",
    request->base_url,
    request->project,
    request->target_branch,
    request->query,
    request->page,
    clamp_page_size(request->page_size),
    request->timeout_ms
  );
  append_bool_param(buffer, size, "include_archived", request->include_archived);
  append_bool_param(buffer, size, "compact", request->compact_output);

  return 0;
}

int send_merge_preview_request(const MergePreviewRequest *request, char *response, size_t response_size) {
  char url[1024];
  int status = build_merge_preview_url(request, url, sizeof(url));

  if (status != 0) {
    return status;
  }

  snprintf(response, response_size, "GET %s HTTP/1.1\\nHost: merge-preview.internal\\n", url);
  append_debug_header(response, response_size, request);
  snprintf(response + strlen(response), response_size - strlen(response), "X-Merge-Mode: compact\\n\\n");
  return 206;
}`,i=`mismerge3`,a=`c`,o=!1,s=!1,c=!1,l=!1,u=!1,d=!1,f=!1,p=!1,m=!1,h=`light`,g=[`lhs`,`ctr`,`rhs`,`component`,`language`,`wrapLines`,`fixedHeight`,`syncHorizontalScroll`,`disableMerging`,`disableFooter`,`disableHeader`,`disableSyntaxHighlighting`,`ignoreWhitespace`,`ignoreCase`,`theme`];function _(t,n){if(typeof localStorage>`u`)return e(n);let r,i=localStorage.getItem(t);if(i)try{r=e(JSON.parse(i))}catch{r=e(n)}else r=e(n);return r.subscribe(e=>localStorage.setItem(t,JSON.stringify(e))),r}var v=t,y=n,b=r,x=_(`lhs`,v),S=_(`ctr`,y),C=_(`rhs`,b),w=_(`component`,i),T=_(`language`,a),E=_(`wrapLines`,o),D=_(`fixedHeight`,s),O=_(`syncHorizontalScroll`,c),k=_(`disableMerging`,l),A=_(`disableFooter`,u),j=_(`disableHeader`,d),M=_(`disableSyntaxHighlighting`,f),N=_(`ignoreWhitespace`,p),P=_(`ignoreCase`,m),F=_(`theme`,h);function I(){if(!(typeof localStorage>`u`))for(let e of g)localStorage.removeItem(e)}function L(){x.set(v),S.set(y),C.set(b),w.set(i),T.set(a),E.set(o),D.set(s),O.set(c),k.set(l),A.set(u),j.set(d),M.set(f),N.set(p),P.set(m),F.set(h)}export{E as _,j as a,D as c,T as d,x as f,F as g,O as h,A as i,P as l,C as m,w as n,k as o,L as p,S as r,M as s,I as t,N as u};