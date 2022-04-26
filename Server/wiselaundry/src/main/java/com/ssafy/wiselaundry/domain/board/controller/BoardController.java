package com.ssafy.wiselaundry.domain.board.controller;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.db.entity.Comments;
import com.ssafy.wiselaundry.domain.board.request.BoardCreateReq;
import com.ssafy.wiselaundry.domain.board.request.BoardUpdateReq;
import com.ssafy.wiselaundry.domain.board.response.BoardSearchAllRes;
import com.ssafy.wiselaundry.domain.board.response.BoardSearchDetailRes;
import com.ssafy.wiselaundry.domain.board.response.CommentDetailRes;
import com.ssafy.wiselaundry.domain.board.service.BoardService;
import com.ssafy.wiselaundry.global.model.response.BaseResponseBody;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.print.attribute.standard.Media;
import java.util.ArrayList;
import java.util.List;

@Api("유저 API")
@Slf4j
@RestController
@RequestMapping("/api/community")
public class BoardController {
    @Autowired
    BoardService boardService;


    @ApiOperation(value = "모든 게시글 조회", notes = "모든 게시글을 가져다 준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = List.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @GetMapping("/all")
    public ResponseEntity<List<BoardSearchAllRes>> boardSearchAll() {
        List<Board> boards = boardService.boardSearchAll();
        List<BoardSearchAllRes> boardSearchAllResList = new ArrayList<>();

        for (Board board: boards) {
            boardSearchAllResList.add(BoardSearchAllRes.of(board));
        }

        return ResponseEntity.status(200).body(boardSearchAllResList);
    }


    @ApiOperation(value = "게시판 ID로 게시글 조회", notes = "게시글 하나에 대해서만 상세히 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BoardSearchDetailRes.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @GetMapping("/{boardId}")
    public ResponseEntity<BoardSearchDetailRes> boardSearchDetail(@ApiParam(value = "게시판 번호") @PathVariable("boardId") int boardId) {
        Board board = boardService.boardSearchById(boardId);
        List<CommentDetailRes> commentDetailResList = new ArrayList<>();

        for (Comments comment : board.getComments()) {
            commentDetailResList.add(CommentDetailRes.builder()
                            .commentContent(comment.getCommentContent())
                            .commentId(comment.getCommentId())
                            .commentDate(comment.getCommentDate())
                            .build());
        }

        BoardSearchDetailRes boardSearchDetailRes = BoardSearchDetailRes.builder()
                .boardContent(board.getBoardContent())
                .boardDate(board.getBoardDate())
                .boardId(board.getBoardId())
                .boardImgs(board.getBoardImgs())
                .boardName(board.getBoardName())
                .userId(board.getUser().getUserId())
                .userNick(board.getUser().getUserNick())
                .userImg(board.getUser().getUserImg())
                .comments(commentDetailResList)
                .build();
        return ResponseEntity.status(200).body(boardSearchDetailRes);
    }


    @ApiOperation(value = "게시글 작성", notes = "게시글 하나 생성")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @PostMapping(value = "/create", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<? extends BaseResponseBody> boardCreate(@RequestPart BoardCreateReq body,
                                                                  MultipartHttpServletRequest file) {
        log.info("boardCreate-call");

        boardService.boardCreate(body, file);
        return ResponseEntity.status(201).body(new BaseResponseBody(201, "생성 완료"));
    }


    @ApiOperation(value = "게시글 수정", notes = "게시글 수정")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @PutMapping(value = "/update", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<? extends BaseResponseBody> boardUpdate(@RequestPart BoardUpdateReq body,
                                                                  MultipartHttpServletRequest request) {
        log.info("boardUpdate-call");
        boardService.boardUpdate(body, request);
        return ResponseEntity.status(201).body(new BaseResponseBody(201, "수정 완료"));
    }


    @ApiOperation(value = "게시글 삭제", notes = "게시글 삭제")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @DeleteMapping("/{boardId}")
    public ResponseEntity<? extends BaseResponseBody> boardDelete(@ApiParam @PathVariable("boardId") int boardId) {
        boardService.boardDelete(boardId);
        return ResponseEntity.status(201).body(new BaseResponseBody(201, "수정 완료"));
    }
}
