import{a as R}from"./chunk-NZCH6BLE.js";import{$ as u,C as l,Ea as k,G as v,Ga as A,H as c,O as P,P as m,Qa as F,S as M,T as S,U as O,V as w,W as o,X as a,Y as I,Z as _,_ as d,ca as f,da as x,ka as b,la as y,oa as L,q as C,u as p,v as g,wa as T}from"./chunk-U4FS7TVV.js";function V(i,t){if(i&1){let n=_();o(0,"a",3),d("click",function(){let s=p(n).$implicit,h=u();return g(h.navigateToPost(s.slug))}),o(1,"div",4),I(2,"img",5),a(),o(3,"div",6)(4,"h3"),f(5),y(6,"slice"),a()()()}if(i&2){let n=t.$implicit;c(2),m("src",n.coverImage.url,v),c(3),x(n.title.length>90?L(6,2,n.title,0,90)+"...":n.title)}}function E(i,t){if(i&1){let n=_();o(0,"div",7)(1,"button",8),d("click",function(){p(n);let r=u();return g(r.loadMorePostsFromSeries())}),f(2,"Load more"),a()()}}var G=(()=>{let t=class t{constructor(){this.blogService=l(F),this.paginationInfo={hasNextPage:!0,endCursor:""},this.postsInSeries=[],this.isHiddenLoadMore=!0,this.isActiveInfiniteScroll=!1,this.route=l(k),this.slug="",this.router=l(A)}ngOnInit(){this.blogURL=this.blogService.getBlogURL(),this.route.params.subscribe(e=>{this.slug=e.slug,this.loadPostsInSeries()})}navigateToPost(e){this.router.navigate(["/post",e])}loadPostsInSeries(){this.blogService.getPostsInSeries(this.blogURL,this.slug).subscribe(e=>{this.paginationInfo=e.pagination,this.isHiddenLoadMore=!e.pagination.hasNextPage,this.postsInSeries=e.posts})}loadMorePostsFromSeries(){this.paginationInfo.hasNextPage&&(this.isHiddenLoadMore=!0,this.blogService.getPostsInSeries(this.blogURL,this.slug,this.paginationInfo.endCursor).pipe().subscribe(e=>{this.isActiveInfiniteScroll=!0,this.paginationInfo=e.pagination,this.postsInSeries=this.postsInSeries.concat(e.posts)}))}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=C({type:t,selectors:[["app-series"]],standalone:!0,features:[b],decls:5,vars:2,consts:[["infiniteScroll","",1,"series-view",3,"isActiveInfiniteScroll","scrolled"],[1,"cards-wrapper","grid"],["class","load-more-posts"],[1,"card",3,"click"],[1,"card-image"],[3,"src"],[1,"card-title"],[1,"load-more-posts"],[3,"click"],["class","card"]],template:function(r,s){r&1&&(o(0,"div",0),d("scrolled",function(){return s.loadMorePostsFromSeries()}),o(1,"div",1),O(2,V,7,6,"a",9,S),a(),P(4,E,3,0,"div",2),a()),r&2&&(m("isActiveInfiniteScroll",s.isActiveInfiniteScroll),c(2),w(s.postsInSeries),c(2),M(4,s.paginationInfo.hasNextPage&&!s.isHiddenLoadMore?4:-1))},dependencies:[R,T],styles:[".series-view[_ngcontent-%COMP%]{width:95vw;min-height:67.2vh;padding:.5rem 0;margin-bottom:2rem}.series-view[_ngcontent-%COMP%]   .layout-control[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.series-view[_ngcontent-%COMP%]   .cards-wrapper[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;margin:2rem 1rem 1rem}.series-view[_ngcontent-%COMP%]   .cards-wrapper.grid[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover{transform:scale(1.1);transition:all .3s ease-in-out}.series-view[_ngcontent-%COMP%]   .cards-wrapper.list[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{display:flex;width:70%}.series-view[_ngcontent-%COMP%]   .cards-wrapper.list[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-image[_ngcontent-%COMP%]{width:100%;height:100%;border-radius:1rem 0 0 1rem}.series-view[_ngcontent-%COMP%]   .cards-wrapper.list[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]{height:4rem;border-radius:0}.series-view[_ngcontent-%COMP%]   .cards-wrapper.list[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   .card-brief[_ngcontent-%COMP%]{padding-bottom:1rem}.series-view[_ngcontent-%COMP%]   .load-more-posts[_ngcontent-%COMP%]{display:flex;justify-content:center}.series-view[_ngcontent-%COMP%]   .load-more-posts[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:1rem;text-transform:uppercase}"]});let i=t;return i})();export{G as SeriesComponent};